import React, { useState } from "react";
import { useAuth } from './../../context/AuthContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/components/Payment.scss";

const Payment = ({ onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    month: "",
    year: "",
    income_amount: "",
    comments: "",
  });

  const monthMapping = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmailNotification = (apiData) => {
    axios.post('https://kodamharish.pythonanywhere.com/pg_tenant_send_mail', {
      tenant_name: apiData.tenant_name,
      to_email: "asaikrishnachary@gmail.com",
      subject: "Payment Confirmation",
      amount: apiData.income_amount,
      payment_id: apiData.razorpay_payment_id,
      building_name: apiData.building_name,
      month: apiData.month,
      year: apiData.year,
      balance: 1000
    })
    .then(emailResponse => {
      console.log('Email sent successfully', emailResponse.data);
    })
    .catch(emailError => {
      console.error('Email sending error', emailError);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiData = {
      manager_email: user.manager_email,
      building_name: user.building_name,
      tenant_mobile: user.mobile,
      tenant_name: user.username,
      tenant_email: user.email,
      date: new Date().toISOString().split("T")[0],
      type: "1",
      month: monthMapping[formData.month],
      year: formData.year,
      income_amount: formData.income_amount,
      comments: formData.comments,
      razorpay_payment_id: "N/A"  // Setting a dummy payment ID since we are skipping Razorpay
    };

    axios.post("https://iiiqbets.com/pg-management/razorpay-orderID-tenant-fee-pay-update-API.php", apiData)
      .then((response) => {
        console.log("API response", response.data);

        // Send email notification
        sendEmailNotification(apiData);

        setFormData({
          month: "",
          year: "",
          income_amount: "",
          comments: "",
        });
        onClose(); 
        alert("Payment successful!");
        navigate("/payments");
      })
      .catch((error) => {
        console.error("API error", error);
      });
  };

  return (
    <div className="payment_container">
      <div className="card payment_card">
        <span className="close-button1" onClick={onClose}>
          &times;
        </span>
        <h2 className="Payment_title">Payment Form</h2>
        <form onSubmit={handleSubmit} className="Payment_form">
          <div className="form-group">
            <label htmlFor="month" className="Payment_label">
              Select Month:
            </label>
            <select
              className="form-control custom-dropdown"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              placeholder="Select your payment month..."
            >
              <option value="" disabled hidden>
                Select your payment month...
                <span className="dropdown-symbol">&#9660;</span>
              </option>
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
          </div>
          <div className="form-group">
            <label htmlFor="year" className="Payment_label">
              Select Year:
            </label>
            <select
              className="form-control custom-dropdown"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Select your payment year..."
            >
              <option value="" disabled hidden>
                Select your payment year...
                <span className="dropdown-symbol">&#9660;</span>
              </option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Income Amount" className="Payment_label_income">Income Amount:</label>
            <input
              type="number"
              id="Income Amount"
              className="form-control"
              placeholder="Income Amount"
              name="income_amount"
              value={formData.income_amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment" className="Payment_label">Comment:</label>
            <input
              type="text"
              id="comment"
              className="form-control"
              placeholder="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="Payment_pay_button">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
