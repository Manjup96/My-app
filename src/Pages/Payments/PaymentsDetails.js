
import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import "../../styles/components/PaymentsDetails.scss";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page

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
    setCurrentPage(1); // Reset to the first page when search changes
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    <div className={`news-container ${isPopupOpen ? 'overlay' : ''}`}>
      <Sidebar />
      <div className="News-Title">
        <h2>Payment Details</h2>
      </div>
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Search news..."
          className="search-input"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="Payments_button">
        <button className="payments_button_style" onClick={handleOpenForm}>
          Make Payment
        </button>
      </div>
      {isPopupOpen && <ModalForm onClose={handleClose} />}
      <div className="TableContainer">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <div className="payment-row">
            {currentItems.map((news, index) => (
              <div key={index} className="payment">
                <div className="payment-header">
                  ID: {indexOfFirstItem + index + 1}
                </div>
                <div className="payment-body">
                  <p className="payment-text">
                    <small className="text-muted">
                      <b>Date: </b> {news.date}
                    </small>
                  </p>
                  <p className="payment-text">
                    <small className="text-muted">
                      <b>Amount Paid: </b> {news.income_amount}
                    </small>
                  </p>
                  <p className="payment-text">
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
        {/* Pagination controls */}
        <div className="pagination-container">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      Prev
                    </button>
                  </li>
                  {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(filteredData.length / itemsPerPage) ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
      </div>
    </div>
  );
};

const ModalForm = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button1" onClick={onClose}>
          &times;
        </span>
        <PaymentForm />
      </div>
    </div>
  );
};

export default News;
