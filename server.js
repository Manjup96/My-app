const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Create a Nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: 'asaikrishnachary@gmail.com',
    pass: 'fqcw zsit pngb icoa',
  },
});

// Helper function to generate the HTML table
const generateEmailTable = (email, amount, paymentId) => {
  return `
    <table style="width: 30%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Field</th>
        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Details</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Amount</td>
        <td style="border: 1px solid #ddd; padding: 8px;">INR ${amount}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Payment ID</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${paymentId}</td>
      </tr>
    </table>
  `;
};

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { manager_email, tenant_email, income_amount, razorpay_payment_id, building_name, tenant_name, comments } = req.body;

  // Configure the email message for the customer
  const customerEmailOptions = {
    from: 'asaikrishnachary@gmail.com', // Sender's email address
    to: "asaikrishnachary@gmail.com", // Customer's email address


    subject: 'Payment Confirmation',
    html: `
      <p>Dear ${tenant_name},</p>
  <p>Thank you for your payment on PG-Tenant. We are delighted to have you as a member of our community.</p>
  <p>Below are your payment details:</p>
  ${generateEmailTable(tenant_email, income_amount, razorpay_payment_id)}
  <p>If you have any questions or need further assistance, please feel free to contact us (https://pg-tenant12.web.app/). We are here to help!</p>
  <p>Best regards,</p>
  <p>The PG-Tenant Team</p>
    `,
  };
  console.log(customerEmailOptions);

  // Configure the email message for the admin
  const adminEmailOptions = {
    from: 'asaikrishnachary@gmail.com', // Sender's email address
    to: "asaikrishnachary@gmail.com", // Admin's email address


    subject: 'Payment Notification',
    html: `
     <p>Dear Admin,</p>
  <p>We have received a new payment from a ${tenant_name} on PG-Tenant.</p>
  <p>Here are the details:</p>
  ${generateEmailTable(tenant_email, income_amount, razorpay_payment_id)}
  <p>Please ensure that the payment is recorded and the tenant's account is updated accordingly.</p>
  <p>Best regards,</p>
  <p>The PG-Tenant System</p> 
    `,
  };

  console.log(adminEmailOptions);

  // Send the email to the customer
  transporter.sendMail(customerEmailOptions, (error, info) => {
    if (error) {
      console.error('Error sending customer email:', error);
      return res.status(500).json({ message: 'Error sending customer email', error });
    } else {
      console.log('Customer email sent:', info.response);

      transporter.sendMail(adminEmailOptions, (error, info) => {
        if (error) {
          console.error('Error sending admin email:', error);
          return res.status(500).json({ message: 'Error sending admin email', error });
        } else {
          console.log('Admin email sent:', info.response);
          return res.status(200).json({ message: 'Emails sent successfully' });
        }
      });
    }
  });
});

// Start the server
const port = 3001; // Change the port if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
