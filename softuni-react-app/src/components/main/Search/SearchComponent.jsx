import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { ApiService } from '../../../services/api';

const SearchComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [merchants, setMerchants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getMerchants().then((res) => {
      setMerchants(res);
      setIsLoading(false);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchBox = () => {
    if (!searchTerm.trim()) {
      ApiService.getMerchants().then((res) => {
        setMerchants(res);
      });
    } else {
      ApiService.searchMerchants(searchTerm).then((res) => {
        console.log(res);
        setMerchants(res);
      });
    }
    setSearchTerm('');
  };


  return (
    <main>
      <h1 className="gallery-title">BROWSE MERCHANTS</h1>
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="box">
            <input
              className='searchbox'
              type="text"
              name="search"
              id=""
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <a onClick={searchBox}>
              <i className="fas fa-search"></i>
            </a>
          </div>
          <div className="gallery-container">
            {isLoading && (
              <div className="app-loader">
                {/* Loader Component or animation */}
              </div>
            )}
            {!isLoading && merchants.map((merchant) => (
              <div
                className="image-container"
                data-text={merchant.user}
                onClick={() => navigate(`/merchant/${merchant.uid}`)}
                key={merchant.uid}
              >
                <img src={merchant.photoURL || '/assets/dummy-user.png'} alt={merchant.user} />
              </div>
            ))}
          </div>
        </div>
        <div className="whitespace"></div>
        {/* SVG shapes here */}
      </section>
    </main>
  );
};

export default SearchComponent;