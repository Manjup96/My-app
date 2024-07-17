import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import ComplaintsForm from "./ComplaintsForm";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faTable, faTh, faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import {
  TENANAT_COMPLAINT_URL,
  TENANAT_COMPLAINT_UPDATE_URL,
  TENANAT_COMPLAINT_DELETE_URL
}
  from "../../services/ApiUrls";
import "../../styles/components/ComplaintsDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useAuth } from "./../../context/AuthContext";

const ComplaintsDetails = () => {
  const [showForm, setShowForm] = useState(false);
 // const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(8);
  const [readMoreStates, setReadMoreStates] = useState({});
  const [view, setView] = useState('table');
  const { user } = useAuth();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showAlert, setShowAlert] = useState(false);


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
        const response = await fetch(TENANAT_COMPLAINT_URL, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const dataWithId = data.map((complaint, index) => ({
          ...complaint,
          displayId: index + 1,
        }));
        setComplaints(dataWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);



  useEffect(() => {
    if (!showForm && showAlert) {
      alert('Form has been closed!');
      setShowAlert(false);
    }
  }, [showForm, showAlert]);




  const handleOpenForm = (complaint = null) => {
    setSelectedComplaint(complaint);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedComplaint(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: selectedComplaint ? selectedComplaint.id : undefined,
          tenant_mobile: user.mobile,
          tenant_email: user.email,
          manager_email: user.manager_email,
          manager_mobile: user.manager_mobile,
          building_name: user.building_name,
          tenant_name: user.name,
          
        }),
      };

      const url = selectedComplaint
        ? TENANAT_COMPLAINT_UPDATE_URL
        : "https://iiiqbets.com/pg-management/Complaints-POST-API-with-manager-buiding.php";

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (selectedComplaint) {
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint.id === selectedComplaint.id ? data : complaint
          )
        );
      } else {
        setComplaints([...complaints, data]);
      }

      handleCloseForm();

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  const handleDeleteComplaint = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
      if (confirmDelete) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        };

        const response = await fetch(TENANAT_COMPLAINT_DELETE_URL, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setComplaints(complaints.filter((complaint) => complaint.id !== id));
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      (complaint.id && complaint.displayId.toString().includes(lowerSearchTerm)) ||
      (complaint.tenant_name && complaint.tenant_name.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.complaint_type && complaint.complaint_type.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.complaint_description && complaint.complaint_description.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.created_date && new Date(complaint.created_date).toLocaleDateString("en-IN").toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.resolve_date && new Date(complaint.resolve_date).toLocaleDateString("en-IN").toLowerCase().includes(lowerSearchTerm))
    );
  });


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
      width: "20%", // Default width for most columns
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    idCol: {
      width: "10%", // Reduced width for ID column
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    descriptionCol: {
      width: "50%", // Increased width for Description column
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

  const MyDocument = ({ complaints }) => (
    <Document>
      <Page style={{ padding: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.idCol}>
              <Text style={styles.tableCell}>Id</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tenant Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Complaint Type</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCell}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Created Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Resolved Date</Text>
            </View>
          </View>
          {complaints.map((complaint, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.idCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{complaint.tenant_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{complaint.complaint_type}</Text>
              </View>
              <View style={styles.descriptionCol}>
                <Text style={styles.tableCell}>{complaint.complaint_description}</Text>
              </View>
              <View style={styles.tableCol}>
                {/* <Text style={styles.tableCell}>{complaint.created_date}</Text> */}
                 <Text style={styles.tableCell}>{formatDate(complaint.created_date)}</Text>
                {/* <Text style={styles.tableCell}>{new Date(complaint.created_date).toLocaleDateString("en-IN")}</Text>   */}
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{new Date(complaint.resolve_date).toLocaleDateString("en-IN")}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const IndividualComplaintDocument = ({ complaint }) => (
    <Document>
      <Page style={{ padding: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.idCol}>
              <Text style={styles.tableCell}>Id</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tenant Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Complaint Type</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCell}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Created Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Resolved Date</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.idCol}>
              <Text style={styles.tableCell}>{complaint.displayId}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.tenant_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.complaint_type}</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCell}>{complaint.complaint_description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.created_date}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.resolve_date}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredComplaints.length / complaintsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleToggleReadMore = (id) => {
    setReadMoreStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };




  const [sortBy, setSortBy] = useState({ field: null, order: null });

  const handleSort = (field) => {
    const sortOrder = sortBy.field === field && sortBy.order === 'asc' ? 'desc' : 'asc';
    setSortBy({ field, order: sortOrder });
  };

  const sortedComplaints = [...currentComplaints].sort((A, B) => {
    if (sortBy.field) {
      const order = sortBy.order === 'asc' ? 1 : -1;
      if (sortBy.field === 'created_date' || sortBy.field === 'resolve_date') {
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

    <div className="complaints-table-list">
      <table className="complaints-table">
        {/* Table headers */}
        <thead>
          <tr>
            <th onClick={() => handleSort('displayId')}>
              ID {getSortIcon('displayId')}
            </th>
            <th onClick={() => handleSort('complaint_type')}>
              Complaint Type {getSortIcon('complaint_type')}
            </th>
            <th onClick={() => handleSort('complaint_description')}>
              Description {getSortIcon('complaint_description')}
            </th>
            {/* <th>Description</th> */}
            <th onClick={() => handleSort('created_date')}>
              Created Date {getSortIcon('created_date')}
            </th>
            <th onClick={() => handleSort('resolve_date')}>
              Resolved Date {getSortIcon('resolve_date')}
            </th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {sortedComplaints.map((complaint) => {
            const readMore = readMoreStates[complaint.id] || false;

            return (
              <tr key={complaint.id}>
                <td>{complaint.displayId}</td>
                <td>{complaint.complaint_type}</td>
                <td className="complaint-description">
                  {readMore ? complaint.complaint_description : `${complaint.complaint_description.substring(0, 20)}`}
                  {complaint.complaint_description.length > 20 && (
                    // <span className="read-more-link">
                    //   {/* Implement read more functionality if needed */}
                    // </span>
                    <span className="read-more-link">
                    <a onClick={() => handleToggleReadMore(complaint.id)} className="btn-read-more">
                      {readMore ? "...Read Less" : "...Read More"}
                    </a>
                  </span>
                  )}
                </td>
                <td>{new Date(complaint.created_date).toLocaleDateString("en-IN")}</td>
                <td>{new Date(complaint.resolve_date).toLocaleDateString("en-IN")}</td>
                <td>{complaint.comments}</td>
                <td className="complaint-table-actions">
                  <div className="complaint-table-icons">
                    <PDFDownloadLink
                      document={<IndividualComplaintDocument complaint={complaint} />}
                      fileName={`complaint_${complaint.displayId}.pdf`}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "" : <FontAwesomeIcon icon={faFileExport} />
                      }
                    </PDFDownloadLink>
                    <button className="btn-edit-complaints" onClick={() => handleOpenForm(complaint)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn-delete-complaints" onClick={() => handleDeleteComplaint(complaint.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
    
  );

  const renderCards = () => (

    <div className="row complaints-cards">
      {currentComplaints.map((complaint) => {
        const readMore = readMoreStates[complaint.id] || false;

        return (
          <div key={complaint.id} className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="complaint-card">
              <div className="complaint-card-content">
                <div className="card-header" style={{ textAlign: "center" }}>
                  ID: {complaint.displayId}
                </div>
                <br />
                <strong>Complaint Type:</strong> {complaint.complaint_type}
                <br />
                <strong>Description:</strong>

                {readMore ? complaint.complaint_description : `${complaint.complaint_description.substring(0, 20)}`}
                {complaint.complaint_description.length > 15 && (
                  <span className="read-more-link">
                    <a onClick={() => handleToggleReadMore(complaint.id)} className="btn-read-more">
                      {readMore ? "...Read Less" : "...Read More"}
                    </a>
                  </span>
                )}
                <br />
                <strong>Created Date:</strong> {new Date(complaint.created_date).toLocaleDateString("en-IN")}
                <br />
                <strong>Resolved Date:</strong> {complaint.resolve_date}
                <br />
                <strong>Comments:</strong> {complaint.comments}
              </div>
              <div className="complaint-card-actions mt-2">
                <div className="complaint-card-icons">
                  <PDFDownloadLink
                    document={<IndividualComplaintDocument complaint={complaint} />}
                    fileName={`complaint_${complaint.id}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "" : <FontAwesomeIcon icon={faFileExport} />
                    }
                  </PDFDownloadLink>

                  <button className="btn-edit-complaints" onClick={() => handleOpenForm(complaint)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn-delete-complaints" onClick={() => handleDeleteComplaint(complaint.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );




  return (
    <div>
      <Sidebar />
      <div>
        <h1  className="heading-complaints">Complaints Details</h1>
      </div>
      <div className="container mt-4">
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}> */}

        <div>

          <PDFDownloadLink document={<MyDocument complaints={filteredComplaints} />} fileName="filtered_complaints.pdf">
            {({ blob, url, loading, error }) => (
              <button className="e_button_complaints" data-tooltip="Download as PDF">
                <FontAwesomeIcon icon={faFilePdf} />
              </button>
            )}
          </PDFDownloadLink>


          <button
            onClick={() => setView(view === 'table' ? 'cards' : 'table')}
            className="switch-button-complaints switch-button-complaints1"
            data-tooltip={view === 'table' ? 'Switch to Cards View' : 'Switch to Table View'}
          >
            <FontAwesomeIcon icon={view === 'table' ? faTh : faTable} />
          </button>


          <button className="complaints_button_style  " onClick={() => handleOpenForm()}>
            Add Complaint
          </button>


        </div>

        <div >



          <button onClick={() => setView(view === 'table' ? 'cards' : 'table')} className="switch-button-complaints2"
            data-tooltip={view === 'table' ? 'Switch to Cards View' : 'Switch to Table View'}>
            <FontAwesomeIcon icon={view === 'table' ? faTh : faTable} />
          </button>
          <input
            type="text"
            placeholder="Search complaints"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control  search-bar SearchContainer_complaints"
          />
        </div>



        {showForm && (
          <ComplaintsForm
            onSubmit={handleFormSubmit}
            onCloseForm={handleCloseForm}
            initialData={selectedComplaint}
          />
        )}

        <div className="complaints-list mt-4">
          {/* <h2 className="complaints-list-heading">Complaints List</h2> */}

          {view === 'table' ? renderTable() : renderCards()}
          <div className="Complaints-count">
                Total Complaints: {filteredComplaints.length}
              </div>
          <nav className="mt-4">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={prevPage}>
                  Prev
                </button>
              </li>
              {[...Array(Math.ceil(filteredComplaints.length / complaintsPerPage)).keys()].map((number) => (
                <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(number + 1)} className="page-link">
                    {number + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(filteredComplaints.length / complaintsPerPage) ? 'disabled' : ''}`}>
                <button className="page-link" onClick={nextPage}>
                  Next
                </button>
                
              </li>
            </ul>
          </nav>
        </div>
        
      </div>
    </div>
  );
};


const formatDate = (dateString) => {
  //  console.log('Date recived from function calling', dateString)
    // const [year, month, day] = dateString.split(' ')[0].split('-');
   const [day, month, year] = dateString.split(' ')[0].split('-');
  console.log('day', day);
  console.log('month', month);
  console.log('year', year);
  return `${day}/${month}/${year}`;
};


const formatDate1 = (dateString) => {
  console.log('Date received from function calling', dateString);

  // Check if dateString is in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split(' ')[0].split('-');
    console.log('day', day);
    console.log('month', month);
    console.log('year', year);
    return `${day}/${month}/${year}`;
  }

  // Check if dateString is in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split(' ')[0].split('-');
    console.log('day', day);
    console.log('month', month);
    console.log('year', year);
    return `${day}/${month}/${year}`;
  }

  // Default return if the format is not recognized
  return dateString;
};

// Example usage
const date1 = "2024-07-13"; // "YYYY-MM-DD"
const date2 = "13-07-2024"; // "DD-MM-YYYY"
console.log(formatDate1(date1)); // Output: 13/07/2024
console.log(formatDate1(date2)); // Output: 13/07/2024


export default ComplaintsDetails;