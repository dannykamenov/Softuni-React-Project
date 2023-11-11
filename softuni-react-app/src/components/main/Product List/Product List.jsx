import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ApiService } from '../../../services/api';
import './Product List.css'; 

function ProductList() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [payments, setPayments] = useState([]);
  const [noReviews, setNoReviews] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const currentUserId = auth.currentUser?.uid;
    ApiService.getProducts(currentUserId).then((res) => {
      setReviews(res);
      setIsLoading(false);
      if (res.length === 0) {
        setNoReviews(true);
      }
    });

    ApiService.getPaymentDetails(currentUserId).then((res) => {
      setPayments(res);
    });
  }, [auth.currentUser]);

  const ownerChecker = (uid) => {
    return uid === auth.currentUser?.uid;
  };

  const deleteMyProduct = (id) => {
    const agree = window.confirm('Are you sure you want to delete this review?');
    if (agree) {
      ApiService.deleteProduct(id).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <main>
      <h1 className="gallery-titlex">YOUR PRODUCTS</h1>
      <div className="whitespacex">
        <Link to="/create-product" className="add-btnx ctax">ADD A PRODUCT</Link>
      </div>
      <section className="gallery-sectionx">
        <div className="gallery-containerx">
          {isLoading && (
            <div className="app-loader">
              {/* Replace with your loader component */}
            </div>
          )}
          {!isLoading && reviews.map((review) => (
            <div key={review._id} className="imgx">
              <i className="fa-solid fa-money-bill-trend-up"></i>
              {ownerChecker(review.uid) && (
                <div className="btnsx">
                  <Link to={`/edit-product/${review._id}`} className="btnx btnPrimaryx">Edit</Link>
                  <a onClick={() => deleteMyProduct(review._id)} className="btnx btnPrimaryx">Delete</a>
                </div>
              )}
              <h3 className="titlex">{review.title}</h3>
              <p className="contentx">{review.description}</p>
              <p className="contentx">${review.price}</p>
              <div className="user-infox">
                <img src={review.photoURL} alt="" />
                <div className="user-namex">
                  <h3>{review.user}</h3>
                </div>
              </div>
            </div>        
          ))}
        </div>
        <h1 className="gallery-titlex">YOUR PAYMENTS</h1>
        {payments.map((payment) => (
          <p key={payment._id} className="contentx">
            <strong>Date:</strong> {payment.date}, <strong>User:</strong> {payment.user} purchased {payment.productName} for ${payment.price}!
          </p>
        ))}
        <div className="whitespacex"></div>
        {noReviews && <div className="fillerdivx"><h2 className="content2x">No listings yet! Upload your product now!</h2></div>}
        {/* Custom Shape Divider - Converted to JSX */}
        <div className="custom-shape-divider-bottom-1688329329">
          {/* SVG JSX Here */}
        </div>
      </section>
    </main>
  );
}

export default ProductList;