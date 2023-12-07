import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { ApiService } from "../../../services/api";
import "./Product List.css";
import { onAuthStateChanged } from "firebase/auth";

//Product List Component

function ProductList() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [payments, setPayments] = useState([]);
  const [noReviews, setNoReviews] = useState(false);
  const [sales, setSales] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [latestSaleDaysAgo, setLatestSaleDaysAgo] = useState(null);
  const [joinDateAgo, setJoinDateAgo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        ApiService.getProducts(uid)
          .then((res) => {
            setReviews(res);
            setIsLoading(false);
            setNoReviews(res.length === 0);
          })
          .catch((error) => {
            setIsLoading(false);
          });

        ApiService.getPaymentDetails(uid)
          .then((res) => {
            setPayments(res);
            setSales(res.length);
            let total = 0;
            res.forEach((payment) => {
              total += payment.price;
            });
            setRevenue(total);
            const latestSale = res[res.length - 1];
            const latestSaleDate = new Date(latestSale.date);
            const today = new Date();
            const diffTime = Math.abs(today - latestSaleDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            setLatestSaleDaysAgo(diffDays);
          })
          .catch((error) => {
            console.error("Error fetching payment details:", error);
          });
        const joinDate = new Date(user.metadata.creationTime);
        const today = new Date();
        const diffTime = Math.abs(today - joinDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setJoinDateAgo(diffDays);
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const ownerChecker = (uid) => {
    return uid === auth.currentUser?.uid;
  };

  const deleteMyProduct = (id) => {
    const agree = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (agree) {
      ApiService.deleteProduct(id).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <main>
      <h1 className="gallery-titlex">MERCHANT STATS</h1>
      <div className="whitespacex">
        <div className="stat-box">
          <div className="days-active stat-box-content">
              <p>Joined:</p>
              <p><strong>{joinDateAgo} days ago.</strong></p>
          </div>
          <div className="revenue stat-box-content">
              <p>Revenue:</p>
              <p><strong> {revenue} $</strong></p>
          </div>
          <div className="sale-count stat-box-content">
              <p>Sales:</p>
              <p><strong>{sales}</strong></p>
          </div>
          <div className="last-sale-days stat-box-content">
              <p>Last sale:</p>
              <p><strong>{latestSaleDaysAgo} days ago.</strong></p>
          </div>
        </div>
      </div>
      <h1 className="gallery-titlex">YOUR PRODUCTS</h1>
      <div className="whitespacex">
        <Link to="/create-product" className="add-btnx ctax">
          ADD A PRODUCT
        </Link>
      </div>
      <section className="gallery-sectionx">
        <div className="gallery-containerx">
          {isLoading && (
            <div className="app-loader">
              {/* Replace with your loader component */}
            </div>
          )}
          {!isLoading &&
            reviews.map((review) => (
              <div key={review._id} className="imgx">
                <i className="fas fa-money-bill"></i>
                {ownerChecker(review.uid) && (
                  <div className="btnsx">
                    <Link
                      to={`/edit-product/${review._id}`}
                      className="btnx btnPrimaryx"
                    >
                      Edit
                    </Link>
                    <a
                      onClick={() => deleteMyProduct(review._id)}
                      className="btnx btnPrimaryx"
                    >
                      Delete
                    </a>
                  </div>
                )}
                <h3 className="titlex">{review.title}</h3>
                <p className="contentx">{review.description}</p>
                <p className="contentx">${review.price}</p>
                <div className="user-infox">
                  <img src={review.productPhoto} alt="" />
                  <div className="user-namex">
                    <h3>{review.user}</h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <h1 className="gallery-titlex">YOUR SALES</h1>
        {payments.map((payment) => (
          <p key={payment._id} className="contentx">
            <strong>Date:</strong> {payment.date}, <strong>User:</strong>{" "}
            {payment.user} purchased <strong>{payment.productName}</strong> for <strong>${payment.price}</strong>!
          </p>
        ))}
        <div className="whitespacex"></div>
        {noReviews && (
          <div className="fillerdivx">
            <h2 className="content2x">
              No listings yet! Upload your product now!
            </h2>
          </div>
        )}
        {/* Custom Shape Divider - Converted to JSX */}
        <div className="custom-shape-divider-bottom-1688329329">
          {/* SVG JSX Here */}
        </div>
      </section>
    </main>
  );
}

export default ProductList;
