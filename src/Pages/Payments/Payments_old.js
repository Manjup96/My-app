import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    managerEmail: "",
    buildingName: "",
    tenantName: "",
    tenantEmail: "",
    tenantMobile: "",
    date: "",
    type: "1", // Assuming this is a constant value
    month: "",
    year: "",
    incomeAmount: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentOptions = {
      key: "rzp_live_meYRQwcQTdON8u",
      amount: parseInt(formData.incomeAmount) * 100, // Convert to smallest currency unit
      currency: "INR",
      name: "Web Mastery",
      description: "for testing purpose",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        postPaymentDetails(paymentId);
        setFormData({
          managerEmail: "",
          buildingName: "",
          tenantName: "",
          tenantEmail: "",
          tenantMobile: "",
          date: "",
          type: "1",
          month: "",
          year: "",
          incomeAmount: "",
          comments: "",
        });
      },
      theme: {
        color: "#07a291db",
      },
    };
    var pay = new window.Razorpay(paymentOptions);
    pay.open();
  };

  const postPaymentDetails = async (paymentId) => {
    const paymentDetails = {
      manager_email:"ssy.balu@gmail.com",
      building_name: "Building 2",
      tenant_name: "chetan",
      tenant_email:"chetan.chauhan@gmail.com",
      tenant_mobile: 9785734903,
      date: formData.date,
      type: formData.type,
      month: formData.month,
      year: formData.year,
      income_amount: formData.incomeAmount,
      comments: formData.comments,
      razorpay_payment_id: paymentId,
    };

    try {
      const response = await axios.post(
        "https://iiiqbets.com/pg-management/razorpay-orderID-tenant-fee-pay-update-API.php",
        paymentDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Payment details posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting payment details:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4 shadow-lg" style={{ width: "60%" }}>
        <h2 className="mb-4 text-center" style={{ color: "black" }}>
          Pay Fee
        </h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center"
          style={{ flexDirection: "column" }}
        >
          <div className="row">
            <div className="col-6" style={{width:"100%"}}>
              <div className="mb-3">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-6"  style={{width:"100%"}}>
              <div className="mb-3">
                <label htmlFor="month">Month</label>
                <input
                  type="number"
                  className="form-control"
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* <div className="col-6"  style={{width:"100%"}}>
              <div className="mb-3">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="incomeAmount">Income Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="incomeAmount"
                  name="incomeAmount"
                  value={formData.incomeAmount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div> */}
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="comments">Comments</label>
                <input
                  type="text"
                  className="form-control"
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            style={{
              background: "#007bff",
              borderColor: "#07a291db",
              fontSize: "19px",
            
            }}
            className="btn btn-primary pay-button"
          >
           Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
