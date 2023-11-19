import React, { useState } from "react";
import { auth, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ApiService } from "../../../services/api";
import "./Upload Product.css";
import BG from "../../../assets/BG.png";
import { Link } from "react-router-dom";

function PostProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const redirectToProducts = () => {
    window.location.href = '/products';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isVerified = auth.currentUser?.emailVerified;
    if (!isVerified) {
      alert("Please verify your email first!");
      return;
    }

    const storageRef = ref(
      storage,
      `products/${auth.currentUser?.uid}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const productData = {
            title,
            description,
            email: auth.currentUser?.email,
            user: auth.currentUser?.displayName,
            uid: auth.currentUser?.uid,
            price: Number(price),
            date: new Date().toISOString().slice(0, 10),
            photoURL: auth.currentUser?.photoURL,
            productPhoto: downloadURL,
          };
          ApiService.addProduct(productData).then(() => {
             /* window.location.href = '/products'; */
          });
        });
      }
    );
  };

  return (
    <main>
      <section className="contact-us-section">
        <img src={BG} alt="" className="contact-us-image" />
        {/* The custom SVG shape divider here */}
      </section>
      <section className="overlap-contact-section">
        <div className="contact-form">
          <div className="container">
            <h2>Upload your product!</h2>
            <div className="displayTable">
              <div className="displayTableCell">
                <div className="authBlock">
                  <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                      <input
                        type="text"
                        className="uploadFormControl"
                        placeholder="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength="50"
                        name="title"
                      />
                      {title && title.length > 50 && (
                        <p className="error">
                          Title cannot exceed 50 characters!
                        </p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="number"
                        className="uploadFormControl"
                        placeholder="Price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="1"
                        name="price"
                      />
                      {price && Number(price) < 1 && (
                        <p className="error">Price must be at least $1!</p>
                      )}
                    </div>
                    <div className="formGroup">
                      <textarea
                        className="uploadFormControl"
                        placeholder="Describe your product! Max 200 characters."
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="200"
                        name="description"
                      ></textarea>
                      {description && description.length > 200 && (
                        <p className="error">
                          Description cannot exceed 200 characters!
                        </p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="file"
                        id="myFile"
                        name="filename"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="uploadProgressContainer">
                      {uploadProgress > 0  && (
                        <progress value={uploadProgress} max="100">
                          {uploadProgress}%
                        </progress>
                      )}
                    </div>
                    <div className="formGroup">
                      {uploadProgress < 100 && (
                        <input
                          type="submit"
                          className="btn btnPrimary"
                          value="Upload Product!"
                          disabled={!title || !description || !price || !file}
                        />
                      )}
                      {uploadProgress === 100 && (
                        <button className="btn btnPrimary gobackbtn" onClick={redirectToProducts}>Go Back!</button>
                      )}
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

export default PostProduct;
