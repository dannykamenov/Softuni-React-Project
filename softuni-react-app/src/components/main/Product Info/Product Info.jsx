import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import './Product Info.css';
import { auth } from '../../../firebase';
import { ApiService } from '../../../services/api';

// Setup Stripe.js and the Elements provider
const stripePromise = loadStripe('your_stripe_public_key');

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
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'name', // Replace with form input value
          email: 'email', // Replace with form input value
        },
      },
    });

    if (error) {
      setPaymentError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setIsSuccess(true);
      // Perform additional actions such as updating the database or redirecting the user
    }
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
                  <button  className="cc">Crypto via Coinbase</button>
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