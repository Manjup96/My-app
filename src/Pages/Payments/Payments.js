import React from 'react';
import Sidebar from "../../shared/Sidebar";
import '../../styles/components/Payment.scss';

const Payments = () => {
  return (
    <div>
     <Sidebar />
      <div className="Payment-Title">
        <h2>Payment Details </h2>
      </div>
    </div>
  );
};

export default Payments;
