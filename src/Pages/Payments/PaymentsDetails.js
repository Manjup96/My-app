import React, { useState } from "react";
import Sidebar from "../../shared/Sidebar";
import PaymentForm from "./Payments_old";
import "../../styles/components/PaymentsDetails.scss";

const PaymentsDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenForm = () => {
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Sidebar />
      <div className="Payments-Title">
        <h1>Payments Details</h1>
      </div>
      <div className="Payments_button">
        <button className="complaint_button_style" onClick={handleOpenForm}>
          Make Payment
        </button>
      </div>
      <PaymentForm isOpen={isPopupOpen} onClose={handleClose} />
    </div>
  );
};

export default PaymentsDetails;
