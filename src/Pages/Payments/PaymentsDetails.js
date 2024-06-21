import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import "../../styles/components/Payment.scss";
import { Link } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';
import PaymentForm from "./Payments_old";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenForm = () => {
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            manager_email: user.manager_email,
            building_name: user.building_name,
            tenant_mobile: user.mobile,
          }),
        };
        const response = await fetch("https://iiiqbets.com/pg-management/payment-Details-GET-API-Tenant.php", requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNewsData(data);
        setFilteredData(data); // Initialize filteredData with all news data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    // Filter newsData based on searchValue for type, ID, description, and created date
    const filteredNews = newsData.filter(
      (news) =>
        news.news_type.toLowerCase().includes(searchValue.toLowerCase()) ||
        news.id.toString().includes(searchValue) ||
        news.news_description.toLowerCase().includes(searchValue.toLowerCase()) ||
        new Date(`${news.month}-${news.year}`).toLocaleDateString("en-IN").includes(searchValue)
    );
    setFilteredData(filteredNews);
  };

  return (
    <div className={`news-container ${isPopupOpen ? 'overlay' : ''}`}>
      <Sidebar />
      <div className="News-Title">
        <h2>News Details</h2>
      </div>
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Search news..."
          className="search-input"
          value={searchInput}
          onChange={handleSearchInputChange}
          style={{ marginLeft: '80%' }}
        />
      </div>
      <div className="Payments_button" style={{ marginLeft: "1215px", marginTop: "10px" }}>
        <button className="complaint_button_style" onClick={handleOpenForm}>
          Make Payment
        </button>
      </div>
      {isPopupOpen && <ModalForm onClose={handleClose} />}
      <div className="TableContainer">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <div className="card-row">
            {filteredData.map((news, index) => (
              <div key={index} className="card">
                <div className="card-header" style={{ textAlign: "center" }}>
                  ID: {index + 1}
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <small className="text-muted">
                      <b>Date: </b> {news.date}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>Amount Paid: </b> {news.income_amount}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>Month-Year Paid for:</b>{" "}
                      {new Date(news.date).toLocaleDateString("en-IN", { month: 'long', year: 'numeric' })}
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ModalForm = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <PaymentForm />
      </div>
    </div>
  );
};

export default News;
