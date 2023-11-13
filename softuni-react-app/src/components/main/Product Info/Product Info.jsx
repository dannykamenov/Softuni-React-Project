import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import './Product Info.css';
import { auth } from '../../../firebase';
import { ApiService } from '../../../services/api';

// Setup Stripe.js and the Elements provider
const stripePromise = loadStripe('pk_test_51GvcWEEOFAKdfkEnTyD8Pp5mHkey4lg30esEaJcGQmOvXbEELBcdr2Xmk6UMtHZ2idQPO4SuSFXYR5wjpbgnjQh900BSBPNZUy');

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productInfo, setProductInfo] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const productId = window.location.pathname.split('/')[2];
    ApiService.getProductById(productId).then((res) => {
      setProductInfo(res);
      setIsLoading(false);
    });
  }, []);

  const pay = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
        const data = await ApiService.createPaymentIntent(productInfo?.price);
        const clientSecret = data.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: auth.currentUser.displayName,
                },
            },
        });

        if (result.error) {
            // Show error to customer (e.g., insufficient funds)
            setPaymentError(result.error.message);
            console.error(result.error.message);
        } else {
            if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setIsSuccess(true);
                // Payment succeeded, navigate to a new page or show success message
                console.log('Payment successful!');
            } else {
                // Payment failed or was canceled, handle accordingly
                console.error('Payment failed or was canceled.');
            }
        }
    } catch (error) {
        console.error('Payment error:', error);
        setPaymentError('An error occurred during payment processing. Please try again.');
    }
    const paymentDetails = {
        user: auth.currentUser.uid,
        merchant: productInfo.uid,
        productName: productInfo.title,
        price: productInfo.price,
        date: new Date().toLocaleString(),
    }
    ApiService.paymentDetails(paymentDetails).then((res) => {

    });
  };

    const redirectToCoinbase = () => {
        ApiService.createCoinbaseCharge(productInfo, auth.currentUser).then((res) => {
            window.location.href = res.data.hosted_url;
        });
    };

  return (
    <main>
      <h1 className="gallery-title3">{productInfo?.title}</h1>
      <section className="gallery-section3">
        <div className="gallery-container3">
          {isLoading ? (
            <div className="app-loader">
              {/* Loader component or icon */}
            </div>
          ) : (
            <>
              <img src={productInfo?.productPhoto} alt="Product" />
              <div className="info3">
                <h2 className="date3"><strong>Product created:</strong> {productInfo?.date}</h2>
                <h2 className="date3"><strong>Price:</strong> ${productInfo?.price}</h2>
                <h2 className="date3 product-list3"><strong>Description:</strong></h2>
                <p className="product-cta3">{productInfo?.description}</p>
                <div className="payments3">
                  <h2 className="date3">Pay with:</h2>
                  <button onClick={() => setShowPaymentForm(true)} className="cc">Credit/Debit Card</button>
                  <h2 className="date3" style={{ marginTop: '5px' }}>Or</h2>
                  <button  className="cc" onClick={redirectToCoinbase} >Crypto via Coinbase</button>
                  {showPaymentForm && (
                    <div className="card-payment3">
                      <form className="checkout-form3" onSubmit={pay}>
                        <CardElement />
                        <button type="submit" disabled={!stripe}>PAY ${productInfo?.price}</button>
                        {paymentError && <p className="error">{paymentError}</p>}
                        <button onClick={() => setShowPaymentForm(false)}>Cancel</button>
                        {isSuccess && <p className="success">Payment successful! The merchant will be in touch soon!</p>}
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="whitespace3"></div>
      </section>
    </main>
  );
};

const WrappedProductPage = () => (
  <Elements stripe={stripePromise}>
    <ProductPage />
  </Elements>
);

export default WrappedProductPage;