import React, { useState } from "react";
import "../../styles/components/PaymentsDetails.scss";

const PaymentForm = ({ isOpen, onClose }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", { year, month, amount, message });
    // Add your form submission logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="complaint-form-popup-overlay">
      <div className="complaint-form-popup-container">
        <h2>Pay Fee</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="year">Select Year:</label>
          <select id="year" value={year} onChange={handleYearChange}>
            <option value="" disabled>Select Year</option>
            {/* Add year options here */}
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          
          <label htmlFor="month">Select Month:</label>
          <select id="month" value={month} onChange={handleMonthChange}>
            <option value="" disabled>Select Month</option>
            {/* Add month options here */}
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>

          <label htmlFor="amount">Paying Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />

          <label htmlFor="message">Your Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={handleMessageChange}
          />

          <div className="button-group">
            <button type="submit">Pay</button>
            <button type="button" className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
