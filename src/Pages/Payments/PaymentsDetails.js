import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import Sidebar from "../../shared/Sidebar";
import "../../styles/components/PaymentsDetails.scss";
import { useAuth } from './../../context/AuthContext';
import PaymentForm from "./Payments_old";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faTable, faTh, faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const PaymentsDetails = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('table');
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
    const filteredNews = newsData.filter((news) => {
  const newsType = news.news_type ? news.news_type.toLowerCase() : '';
  const newsDescription = news.news_description ? news.news_description.toLowerCase() : '';
  const newsId = news.id ? news.id.toString() : '';
  const newsDate = news.month && news.year ? new Date(`${news.month}-${news.year}`).toLocaleDateString("en-IN") : '';

  return (
    newsType.includes(searchValue.toLowerCase()) ||
    newsId.includes(searchValue) ||
    newsDescription.includes(searchValue.toLowerCase()) ||
    newsDate.includes(searchValue)
  );
});

    setFilteredData(filteredNews);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  // Sort filteredData in descending order based on month and year
  filteredData.sort((a, b) => {
    const dateA = new Date(`${a.year}-${a.month}`);
    const dateB = new Date(`${b.year}-${b.month}`);
    return dateB - dateA;
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const styles = StyleSheet.create({
    table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { flexDirection: "row" },
    tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
    tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  });

  const IndividualPaymentDocument = ({ payment }) => (
    <Document>
      <Page style={{ padding: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Amount Paid</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Month-Year Paid for</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{payment.id}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{payment.date}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{payment.income_amount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {new Date(payment.month).toLocaleDateString("en-IN", { month: 'long' }).replace(' ', '-')} - {payment.year}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const AllPaymentsDocument = ({ news }) => (
    <Document>
      <Page style={{ padding: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Amount Paid</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Month-Year Paid for</Text>
            </View>
          </View>
          {news.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.income_amount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {new Date(item.month).toLocaleDateString("en-IN", { month: 'long' }).replace(' ', '-')} - {item.year}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const [sortBy, setSortBy] = useState({ field: null, order: null });

  const handleSort = (field) => {
    const sortOrder = sortBy.field === field && sortBy.order === 'asc' ? 'desc' : 'asc';
    setSortBy({ field, order: sortOrder });
  };

  const sortedItems = [...currentItems].sort((A, B) => {
    if (sortBy.field) {
      const order = sortBy.order === 'asc' ? 1 : -1;
      if (sortBy.field === 'date' || sortBy.field === 'month') {
        const dateA = new Date(A[sortBy.field]);
        const dateB = new Date(B[sortBy.field]);
        return order * (dateA.getTime() - dateB.getTime());
      } else {
        const valueA = typeof A[sortBy.field] === 'string' ? A[sortBy.field].toLowerCase() : A[sortBy.field];
        const valueB = typeof B[sortBy.field] === 'string' ? B[sortBy.field].toLowerCase() : B[sortBy.field];
        return order * (valueA > valueB ? 1 : -1);
      }
    }
    return 0;
  });

  const getSortIcon = (field) => {
    if (sortBy.field !== field) {
      return <FontAwesomeIcon icon={faSort} />;
    }
    if (sortBy.order === 'asc') {
      return <FontAwesomeIcon icon={faSortUp} />;
    }
    return <FontAwesomeIcon icon={faSortDown} />;
  };


  const renderTable = () => (
    
     <div className="TableContainer-payment">
  {loading && <div>Loading...</div>}
  {error && <div>Error: {error}</div>}
  {!loading && !error && (
    
    // <table className="payment-table">
    //   <thead>
    //     <tr>
    //       <th>ID</th>
    //       <th>Date</th>
    //       <th>Amount Paid</th>
    //       <th>Month-Year Paid for</th>
    //       <th className="download">Download</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {currentItems.map((news, index) => (
    //       <tr key={index} >
    //         <td>{indexOfFirstItem + index + 1}</td>
    //         <td>{news.date}</td>
    //         <td>{news.income_amount}</td>
    //         <td>
    //           {new Date(news.month)
    //             .toLocaleDateString("en-IN", { month: "long" })
    //             .replace(" ", "-")}-{news.year}
    //         </td>
    //         <td className="download">
    //           <PDFDownloadLink
    //             document={<IndividualPaymentDocument payment={news} />}
    //             fileName={`payment_${news.id}.pdf`}
    //           >
    //             {({ loading }) =>
    //               loading ? "Loading document..." : <FontAwesomeIcon icon={faFileExport} />
    //             }
    //           </PDFDownloadLink>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <table className="payment-table">
    <thead>
      <tr>
        <th onClick={() => handleSort('id')}>
          ID {getSortIcon('id')}
        </th>
        <th onClick={() => handleSort('date')}>
          Date {getSortIcon('date')}
        </th>
        <th onClick={() => handleSort('income_amount')}>
          Amount Paid {getSortIcon('income_amount')}
        </th>
        <th onClick={() => handleSort('month-year')}>
          Month-Year Paid for {getSortIcon('month-year')}
        </th>
        <th className="download">Download</th>
      </tr>
    </thead>
    <tbody>
      {sortedItems.map((news, index) => (
        <tr key={index}>
          <td>{indexOfFirstItem + index + 1}</td>
          <td>{news.date}</td>
          <td>{news.income_amount}</td>
          <td>
            {new Date(news.month)
              .toLocaleDateString("en-IN", { month: "long" })
              .replace(" ", "-")}-{news.year}
          </td>
          <td className="download">
            <PDFDownloadLink
              document={<IndividualPaymentDocument payment={news} />}
              fileName={`payment_${news.id}.pdf`}
            >
              {({ loading }) =>
                loading ? "Loading document..." : <FontAwesomeIcon icon={faFileExport} />
              }
            </PDFDownloadLink>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    
  )}
</div>
  );

const renderCards = () => (
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
                {new Date(news.month).toLocaleDateString("en-IN", { month: 'long'}).replace(' ', '-')}-{news.year}
              </small>
            </p>
           
          </div>
          <div>
          <PDFDownloadLink
              document={<IndividualPaymentDocument payment={news} />}
              fileName={`payment_${news.id}.pdf`}
            >
              {({ loading }) =>
                loading ? "Loading document..." : <FontAwesomeIcon icon={faFileExport} />
              }
            </PDFDownloadLink>
            </div>
        </div>
      ))}
    </div>
  )}
  </div>
);

    
  

  return (
    <div className={`news-container ${isPopupOpen ? 'overlay' : ''}`}>
      <Sidebar />
      <div className="News-Title">
        <h1>Payment Details</h1>
      </div>
     
      <div className="Payments_button"> 
        
        <PDFDownloadLink document={<AllPaymentsDocument news={filteredData} />} fileName="filtered_payments.pdf">
          {({ loading }) =>
            loading ? "Loading document..." : (
              <button className="export-button-payment" data-tooltip="Download as PDF">
               <FontAwesomeIcon icon={faFilePdf} />
              </button>
            )
          }
        </PDFDownloadLink>

        <div>
          <button onClick={() => setView(view === 'table' ? 'cards' : 'table')} className="switch_button_payment"
             data-tooltip={view === 'table' ? 'Switch to Cards View' : 'Switch to Table View'}
            >
          <FontAwesomeIcon icon={view === 'table' ? faTh : faTable} />
          </button>
        </div>

        <button className="payments_button_style" onClick={handleOpenForm}>
          Make Payment
        </button>

      </div>
      {isPopupOpen && <ModalForm onClose={handleClose} />}

      {/* <div>
          <button onClick={() => setView(view === 'table' ? 'cards' : 'table')} className="switch_button">
          <FontAwesomeIcon icon={view === 'table' ? faTh : faTable} />
          </button>
        </div> */}

        <div className="SearchContainer_payment">
        <input
          type="text"
          placeholder="Search news..."
          className="search-input-payment"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>

      {view === 'table' ? renderTable() : renderCards()}
      <div className="payments-count">
                Total Payments: {filteredData.length}
              </div>
        <div className="pagination-container-payment">
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
    // </div>
  );
};

const ModalForm = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
          <PaymentForm onClose={onClose}/>
        </div>
      </div>
    </div>
  );
};

export default PaymentsDetails;
