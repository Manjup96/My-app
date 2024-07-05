import React, { useState, useEffect } from 'react';
import { useAuth } from './../../context/AuthContext';
import '../../styles/components/PaymentsTable.scss'; // Import the SCSS file

const PaymentsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { user } = useAuth();

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
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Sort data by Month-Year Paid for (descending order)
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(`${a.year}-${a.month}-01`);
          const dateB = new Date(`${b.year}-${b.month}-01`);
          return dateB - dateA;
        });
        
        // Adding auto-increment ID based on sorted data length
        const updatedData = sortedData.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        
        setData(updatedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]);
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
    <div className="payments-table">
      <h1 className='payments-table-heading'>Payment Details</h1>
      <table className='tables'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Month-Year Paid for:</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.income_amount}</td>
              <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
              <td>{new Date(`${item.year}-${item.month}-01`).toLocaleDateString("en-IN", { month: 'long'}).replace(' ', '-')}-{item.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <div className="pagination-container-paymentstable">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Prev
            </button>
          </li>
          {[...Array(totalPages).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentsTable;
