import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
  const [tenantUsername, setTenantUsername] = useState('');
  const [tenantMobileNumber, setTenantMobileNumber] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantComments, setTenantComments] = useState('');
  const [floorNo, setFloorNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [bedNo, setBedNo] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [managerMobile, setManagerMobile] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const payNow = async () => {
    const todayDate = new Date().toISOString().split('T')[0];
    const confirmation = window.confirm(
      `Please review the following details:\n\n` +
      `Month: ${month}\n` +
      `Year: ${year}\n` +
      `Tenant username: ${tenantUsername}\n` +
      `Tenant mobile number: ${tenantMobileNumber}\n` +
      `Tenant email: ${tenantEmail}\n` +
      `Current Date: ${todayDate}\n` +
      `Floor number: ${floorNo}\n` +
      `Room number: ${roomNo}\n` +
      `Bed number: ${bedNo}\n` +
      `Pay amount: ${payAmount}\n` +
      `Building name: ${buildingName}\n` +
      `Manager email: ${managerEmail}\n` +
      `Manager mobile: ${managerMobile}\n\n` +
      `Press OK to proceed or Cancel to edit the details.`
    );

    if (confirmation) {
      const payAmountInPaise = parseInt(payAmount) * 100;

      try {
        const orderResponse = await axios.get(`https://iiiqbets.com/razor/orders.php?name=${tenantUsername}&email=${tenantEmail}&amount=${payAmountInPaise}`);
        const orderID = orderResponse.data;

        const options = {
          "key": "rzp_live_meYRQwcQTdON8u", // Replace with your Razorpay key ID
          "amount": payAmountInPaise,
          "currency": "INR",
          "name": "iiiQBets",
          "description": "Test Transaction",
          "image": "https://iqbetspro.com/seeders/img/india.jpg",
          "order_id": orderID,
          "handler": async (response) => {
            try {
              const paymentData = {
                "manager_email": managerEmail,
                "building_name": buildingName,
                "tenant_mobile": tenantMobileNumber,
                "tenant_name": tenantUsername,
                "tenant_email": tenantEmail,
                "date": todayDate,
                "type": "Monthly Rent",
                "month": month,
                "year": year,
                "income_amount": payAmount,
                "comments": tenantComments,
                "razorpay_payment_id": response.razorpay_payment_id,
              };

              const updateResponse = await fetch('https://iiiqbets.com/pg-management/razorpay-orderID-tenant-fee-pay-update-API.php', {
                method: 'POST',
                body: JSON.stringify(paymentData),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                }
              });

              const updateData = await updateResponse.json();

              if (updateData.Message.response === 'success') {
                alert('Payment updated successfully.');
                window.location = 'payment-table.php';
              } else {
                alert('Error after returning from API.');
              }
            } catch (error) {
              alert('Error while updating payment details.');
            }
          },
          "prefill": {
            "name": tenantUsername,
            "email": tenantEmail,
            "contact": tenantMobileNumber
          },
          "notes": {
            "address": "Bangalore Head Office"
          },
          "theme": {
            "color": "#3399cc"
          }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          alert(response.error.code);
        });
        rzp1.open();
      } catch (error) {
        alert('Error creating Razorpay order');
      }
    }
  };

  return (
    <div id="paymentModal">
      <form id="paymentForm">
        <label htmlFor="tenantUserName">Tenant Username:</label>
        <input type="text" id="tenantUserName" value={tenantUsername} onChange={(e) => setTenantUsername(e.target.value)} />

        <label htmlFor="tenantMobileNumber">Tenant Mobile Number:</label>
        <input type="text" id="tenantMobileNumber" value={tenantMobileNumber} onChange={(e) => setTenantMobileNumber(e.target.value)} />

        <label htmlFor="tenantEmail">Tenant Email:</label>
        <input type="email" id="tenantEmail" value={tenantEmail} onChange={(e) => setTenantEmail(e.target.value)} />

        <label htmlFor="tenantComments">Tenant Comments:</label>
        <input type="text" id="tenantComments" value={tenantComments} onChange={(e) => setTenantComments(e.target.value)} />

        <label htmlFor="floor_no">Floor Number:</label>
        <input type="text" id="floor_no" value={floorNo} onChange={(e) => setFloorNo(e.target.value)} />

        <label htmlFor="room_no">Room Number:</label>
        <input type="text" id="room_no" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />

        <label htmlFor="bed_no">Bed Number:</label>
        <input type="text" id="bed_no" value={bedNo} onChange={(e) => setBedNo(e.target.value)} />

        <label htmlFor="pay_amount">Pay Amount:</label>
        <input type="text" id="pay_amount" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} />

        <label htmlFor="building_name">Building Name:</label>
        <input type="text" id="building_name" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} />

        <label htmlFor="manager_email">Manager Email:</label>
        <input type="email" id="manager_email" value={managerEmail} onChange={(e) => setManagerEmail(e.target.value)} />

        <label htmlFor="manager_mobile">Manager Mobile:</label>
        <input type="text" id="manager_mobile" value={managerMobile} onChange={(e) => setManagerMobile(e.target.value)} />

        <label htmlFor="month">Select Month:</label>
        <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          {/* Add more months as needed */}
        </select>

        <label htmlFor="year">Select Year:</label>
        <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          {/* Add more years as needed */}
        </select>

        <button type="button" onClick={payNow}>Pay</button>
        <button type="button">Close</button>
      </form>
    </div>
  );
};

export default Payments;
