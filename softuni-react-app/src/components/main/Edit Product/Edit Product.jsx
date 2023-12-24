import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ApiService } from '../../../services/api';
import BG from '../../../assets/BG.png';

function EditProduct() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams(); 
  useEffect(() => {
    ApiService.getProduct(id).then((data) => {
      setTitle(data.title);
      setContent(data.description);
      setPrice(data.price);
    }).catch((error) => {
      setError('Failed to fetch product data');
      console.error(error);
    });
  }, [id]);

  const editReview = (e) => {
    e.preventDefault();
    console.log(e)
    const auth = getAuth();
    if (!auth.currentUser) {
      setError('No authenticated user found.');
      return;
    }
    if (!auth.currentUser.emailVerified) {
      setError('Please verify your email first!');
      return;
    }
    const updatedProduct = {
      title,
      description: content,
      email: auth.currentUser.email,
      user: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      price: Number(price),
      date: new Date().toISOString().slice(0, 10),
      photoURL: auth.currentUser.photoURL
    };
    ApiService.editProduct(id, updatedProduct).then(() => {
        window.location.href = '/products';
    }).catch((error) => {
      setError('Failed to update the product');
      console.error(error);
    });
  };

  return (
    <main>
      <section className="contact-us-section">
        <img src={BG} alt="" className="contact-us-image" />
      </section>
      <section className="overlap-contact-section">
        <div className="contact-form">
          <div className="container">
            <h2>Update your product!</h2>
            <div className="displayTable">
              <div className="displayTableCell">
                <div className="authBlock">
                  <form onSubmit={editReview}>
                    <div className="formGroup">
                      <input
                        type="text"
                        className="formControl"
                        placeholder="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength="50"
                        name="Title"
                      />
                      {title.length > 50 && (
                        <p className="error">Title cannot exceed 50 characters!</p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="number"
                        className="formControl"
                        placeholder="Price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="1"
                        name="price"
                      />
                      {price < 1 && (
                        <p className="error">Price must be at least $1!</p>
                      )}
                    </div>
                    <div className="formGroup">
                      <textarea
                        className="formControl"
                        placeholder="What did you think about us?"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength="200"
                        name="review"
                      ></textarea>
                      {content.length > 200 && (
                        <p className="error">Description cannot exceed 200 characters!</p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="submit"
                        className="btn btnPrimary"
                        value="Confirm Edit!"
                      />
                    </div>
                  </form>
                  {error && <p className="error">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


export default EditProduct;