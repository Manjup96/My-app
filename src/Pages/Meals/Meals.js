import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import ComplaintsForm from "./MealsTable"
import { TENANT_MEALS_GET_URL, TENANT_MEALS_UPDATE_URL, TENANT_MEALS_POST_URL } from "../../services/ApiUrls";
import { useAuth } from './../../context/AuthContext';
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import { faFileExport, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { View, StyleSheet } from "@react-pdf/renderer";

import '../../styles/components/Meals.scss';


const ComplaintsDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(8);
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
        const response = await fetch(TENANT_MEALS_GET_URL, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

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
          tenant_mobile: user.mobile,
          tenant_email: user.email,
          manager_email: user.manager_email,
          manager_mobile: user.manager_mobile,
          building_name: user.building_name,
          tenant_name: user.name,
        }),
      };

      const url = selectedComplaint
        ? TENANT_MEALS_UPDATE_URL
        : TENANT_MEALS_POST_URL;

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

  const handleDelete = async (id) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      };
      const response = await fetch("https://iiiqbets.com/pg-management/delete-Meals-API.php", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setComplaints((prevState) =>
        prevState.filter((complaint) => complaint.id !== id)
      );
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      (complaint.id && complaint.id.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.tenant_name && complaint.tenant_name.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.breakfast && complaint.breakfast.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.lunch && complaint.lunch.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.dinner && complaint.dinner.toLowerCase().includes(lowerSearchTerm)) ||
      (complaint.date && complaint.date.toLowerCase().includes(lowerSearchTerm))
    );
  });

  // const MyDocument = () => (
  //   <Document>
  //     <Page>
  //       {complaints.map((complaint, index) => (
  //         <Text key={index}>
  //           Id: {complaint.id}, TenantName: {complaint.tenant_name}, breakfast:{" "}
  //           {complaint.breakfast}, lunch: {complaint.lunch}, dinner:{" "}
  //           {complaint.dinner}, comments: {complaint.comments}, Date:{" "}
  //           {complaint.date},
  //         </Text>
  //       ))}
  //     </Page>
  //   </Document>
  // );

  // const IndividualComplaintDocument = ({ complaint }) => (
  //   <Document>
  //     <Page>
  //       <Text>
  //         Id: {complaint.id}, TenantName: {complaint.tenant_name}, breakfast:{" "}
  //         {complaint.breakfast}, lunch: {complaint.lunch}, dinner:{" "}
  //         {complaint.dinner}, comments: {complaint.comments}, Date:{" "}
  //         {complaint.date},
  //       </Text>
  //     </Page>
  //   </Document>
  // );



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
              <Text style={styles.tableCell}>breakfast</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCell}>lunch</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>dinner</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>comments</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>date</Text>
            </View>
          </View>
          {complaints.map((complaint, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.idCol}>
                <Text style={styles.tableCell}>{complaint.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{complaint.tenant_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{complaint.breakfast}</Text>
              </View>
              <View style={styles.descriptionCol}>
                <Text style={styles.tableCell}>{complaint.lunch}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{complaint.dinner}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{complaint.comments}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{complaint.date}</Text>
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
              <Text style={styles.tableCell}>breakfast</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCell}>lunch</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>dinner</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>comments</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>date</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.idCol}>
              <Text style={styles.tableCell}>{complaint.id}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.tenant_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.breakfast}</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCell}>{complaint.lunch}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.dinner}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.comments}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{complaint.date}</Text>
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

  return (
    <div>
      <Sidebar onToggle={setSidebarCollapsed} />
      <div className={`content ${sidebarCollapsed ? "collapsed" : ""}`}>

          <h1 style={{ marginTop: "30px" }} className="text-center flex-grow-1">
            Meals Details
          </h1>
        
        <div className="container mt-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>


            <PDFDownloadLink document={<MyDocument complaints={filteredComplaints} />} fileName="filtered_complaints.pdf">
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : (
                  <button className="e_button" style={{ marginLeft: '-10px', backgroundColor: ' #007bff' }}>
                    Export all as Pdf
                  </button>
                )
              }
            </PDFDownloadLink>

            <button className="complaint_button_style" onClick={() => handleOpenForm()}>
              Add Meal
            </button>
          </div>
          <div className="d-flex justify-content-end mb-4">
            <input
              type="text"
              placeholder="Search complaints"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control w-25 search-bar"
            />
          </div>

          <div className="complaints-list mt-4">
            <h2 style={{ marginBottom: "30px" }}>Meals List</h2>
            <div className="row">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>

              </div>
              {currentComplaints.map((complaint, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="complaint-card p-3">
                    <div className="complaint-card-content">
                      <div className="card-header" style={{ textAlign: "center" }}>
                        ID: {complaint.id}
                      </div>
                      <strong>TenantName:</strong> {complaint.tenant_name}
                      <br />
                      <strong>breakfast:</strong> {complaint.breakfast}
                      <br />
                      <strong>lunch:</strong> {complaint.lunch}
                      <br />
                      <strong>dinner:</strong> {complaint.dinner}
                      <br />
                      <strong>comments:</strong> {complaint.comments}
                      <br />
                      <strong>date:</strong> {complaint.date}
                    </div>
                    <div className="complaint-card-actions mt-2">
                      <div className="complaint-card-icons">
                        <PDFDownloadLink
                          document={<IndividualComplaintDocument complaint={complaint} />}
                          fileName={`complaint_${complaint.id}.pdf`}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : <FontAwesomeIcon icon={faFileExport} />
                          }
                        </PDFDownloadLink>

                        <button className="btn btn-secondary me-2" onClick={() => handleOpenForm(complaint)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button className="btn btn-danger" onClick={() => handleDelete(complaint.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>


                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showForm && (
              <div className="form-container">
                <ComplaintsForm
                  onCloseForm={handleCloseForm}
                  onSubmit={handleFormSubmit}
                  initialData={selectedComplaint}
                />
              </div>
            )}
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
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
    </div>
  );
};

export default ComplaintsDetails;
