import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ApiService } from '../../../services/api';

const MerchantPageComponent = () => {
  const { id } = useParams();
  const [merchantInfo, setMerchantInfo] = useState(null);
  const [merchantOffers, setMerchantOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiService.getMerchant(id).then((res) => {
      setMerchantInfo(res[0]);
      setMerchantOffers(res.map((offer) => ({ ...offer, isPreviewVisible: false })));
      setIsLoading(false);
    });
  }, [id]);

  const showPreview = (offerId) => {
    setMerchantOffers(merchantOffers.map((offer) =>
      offer._id === offerId ? { ...offer, isPreviewVisible: true } : offer
    ));
  };

  const hidePreview = (offerId) => {
    setMerchantOffers(merchantOffers.map((offer) =>
      offer._id === offerId ? { ...offer, isPreviewVisible: false } : offer
    ));
  };

  return (
    <main>
      <h1 className="gallery-title">{merchantInfo?.user}</h1>
      <section className="gallery-section">
        <div className="gallery-container">
          {isLoading ? (
            <div className="app-loader">
              {/* Loader Component or animation */}
            </div>
          ) : (
            <>
              <img src={merchantInfo?.photoURL || '/assets/dummy-user.png'} alt="Image" className="merchantimg" />
              <div className="info">
                <h2 className="date"><strong>On our platform since:</strong> {merchantInfo?.date}</h2>
                <h2 className="date"><strong>Email:</strong> {merchantInfo?.email}</h2>
                <h2 className="date product-list"><strong>Products:</strong></h2>
                {merchantOffers.map((offer) => (
                  <div key={offer._id}>
                    <p
                      className="product-cta"
                      onMouseOver={() => showPreview(offer._id)}
                      onMouseOut={() => hidePreview(offer._id)}
                    >
                      <Link to={`/product-info/${offer._id}`}>{offer.title} <i className="fa-solid fa-share-from-square"></i></Link>
                    </p>
                    {offer.isPreviewVisible && (
                      <div className="image-preview">
                        <img src={offer.productPhoto} alt="Image Preview" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="whitespace"></div>
        {/* SVG shapes here */}
      </section>
    </main>
  );
};

export default MerchantPageComponent;