import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import { TENANAT_NEWS_URL } from "../../services/ApiUrls";
import "../../styles/components/News.scss";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useAuth } from './../../context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTable, faTh } from "@fortawesome/free-solid-svg-icons";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Changed from 6 to 8
  const [view, setView] = useState('table');
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
        const response = await fetch(TENANAT_NEWS_URL, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNewsData(data);
        setFilteredData(data.map((item, index) => ({ ...item, seqId: index + 1 })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [user.manager_email, user.building_name, user.mobile]);

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    const filteredNews = newsData
      .filter(
        (news) =>
          news.news_type.toLowerCase().includes(searchValue.toLowerCase()) ||
          news.id.toString().includes(searchValue) ||
          news.news_description.toLowerCase().includes(searchValue.toLowerCase()) ||
          new Date(news.created_at).toLocaleDateString("en-IN").includes(searchValue)
      )
      .map((item, index) => ({ ...item, seqId: index + 1 }));
    setFilteredData(filteredNews);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    idCol: {
      width: "10%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    descriptionCol: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
  });

  const MyDocument = ({ news }) => (
    <Document>
      <Page style={{ padding: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.idCol}>
              <Text style={styles.tableCell}>Seq. ID</Text>
            </View>
            <View style={styles.idCol}>
              <Text style={styles.tableCell}>Id</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Type</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCell}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Created Date</Text>
            </View>
          </View>
          {news.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.idCol}>
                <Text style={styles.tableCell}>{item.seqId}</Text>
              </View>
              <View style={styles.idCol}>
                <Text style={styles.tableCell}>{item.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.news_type}</Text>
              </View>
              <View style={styles.descriptionCol}>
                <Text style={styles.tableCell}>{item.news_description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{new Date(item.created_at).toLocaleDateString("en-IN")}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderTable = () => (
    <table className="news-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Description</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((news, index) => (
          <tr key={index}>
            <td>{news.seqId}</td>
            <td>{news.news_type}</td>
            <td>{news.news_description}</td>
            <td>{new Date(news.created_at).toLocaleDateString("en-IN")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCards = () => (
    <div className="news-row">
      {currentItems.map((news, index) => (
        <div key={index} className="news">
          <div className="news-header" style={{ textAlign: "center" }}>
            ID: {news.seqId}
          </div>
          <div className="news-body">
            <p className="news-text">
              <small className="text-muted">
                <b>Type : </b> {news.news_type}
              </small>
            </p>
            <p className="news-text">
              <small className="text-muted">
                <b>Description : </b> {news.news_description}
              </small>
            </p>
            <p className="news-text">
              <small className="text-muted">
                <b>Created On :</b>{" "}
                {new Date(news.created_at).toLocaleDateString("en-IN")}
              </small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Sidebar />
      <div className="News-Title">
        <h2>News Details</h2>
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
        <PDFDownloadLink document={<MyDocument news={filteredData} />} fileName="filtered_news.pdf">
          {({ loading }) =>
            loading ? "Loading document..." : (
              <button style={{ backgroundColor: '#007bff' }} className="export-button">
                <FontAwesomeIcon icon={faFilePdf} />
              </button>
            )
          }
        </PDFDownloadLink>
        <button onClick={() => setView(view === 'table' ? 'cards' : 'table')} className="switch_button">
          <FontAwesomeIcon icon={view === 'table' ? faTh : faTable} />
        </button>
      </div> */}
 <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
   <PDFDownloadLink document={<MyDocument news={filteredData} />} fileName="filtered_news.pdf">
    {({ loading }) =>
      // loading ? "Loading document..." : (
        <button 
          style={{ backgroundColor: '#007bff', position: 'relative' }} 
          className="export-button"
          data-tooltip="Download as PDF"
        >
          <FontAwesomeIcon icon={faFilePdf} />
        </button>
      // )
    }
  </PDFDownloadLink> 


  <button 
    onClick={() => setView(view === 'table' ? 'cards' : 'table')} 
    className="switch_button"
    data-tooltip={view === 'table' ? 'Switch to Cards View' : 'Switch to Table View'}
  >
    <FontAwesomeIcon icon={view === 'table' ? faTh : faTable} />
  </button>
</div>


      <div className="SearchContainer_news">
        <input
          type="text"
          placeholder="Search news..."
          className="search-input"
          value={searchInput}
          onChange={handleSearchInputChange}
          
        />
      </div>
      <div className="TableContainer">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <>
            {view === 'table' ? renderTable() : renderCards()}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <div className="pagination-container">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {Array.from(
                    { length: Math.ceil(filteredData.length / itemsPerPage) },
                    (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                      >
                        <button className="page-link" onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                  <li
                    className={`page-item ${
                      currentPage === Math.ceil(filteredData.length / itemsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
              <div className="item-count">
                Total Items: {filteredData.length}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
