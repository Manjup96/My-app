import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import ComplaintsForm from "./ComplaintsForm";
import { TENANAT_COMPLAINT_URL } from "../../services/ApiUrls";
import "../../styles/components/ComplaintsDetails.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import { TENANAT_COMPLAINT_UPDATE_URL } from "../../services/ApiUrls";
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { TENANAT_COMPLAINT_DELETE_URL } from "../../services/ApiUrls";


const ComplaintsDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State to track sidebar
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(8); // Number of complaints per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            manager_email: 'ssy.balu@gmail.com',
            building_name: 'Building 1',
            tenant_mobile: '9876543217',
          }),
        };
        const response = await fetch(TENANAT_COMPLAINT_URL, requestOptions);
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
  }, []);

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
        method: selectedComplaint ? "POST" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: selectedComplaint ? selectedComplaint.id : undefined,
        }),
      };

      const url = selectedComplaint
        ? TENANAT_COMPLAINT_UPDATE_URL
        : TENANAT_COMPLAINT_URL;

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

        const response = await fetch(
          TENANAT_COMPLAINT_DELETE_URL,
          requestOptions
        );

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
      complaint.id.toString().includes(lowerSearchTerm) ||
      complaint.complaint_type.toLowerCase().includes(lowerSearchTerm) ||
      complaint.complaint_description.toLowerCase().includes(lowerSearchTerm) ||
      complaint.created_date.toLowerCase().includes(lowerSearchTerm) ||
      complaint.resolve_date.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const MyDocument = () => (
    <Document>
      <Page>
        {complaints.map((complaint, index) => (
          <Text key={index}>
            Id: {complaint.id}, TenantName: {complaint.tenant_name}, Complaint Type: {complaint.complaint_type}, Description: {complaint.complaint_description}, Created Date: {complaint.created_date}, Resolved Date: {complaint.resolve_date}
          </Text>
        ))}
      </Page>
    </Document>
  );

  // Function to render individual complaint PDF
  const IndividualComplaintDocument = ({ complaint }) => (
    <Document>
      <Page>
        <Text>
          Id: {complaint.id}, TenantName: {complaint.tenant_name}, Complaint Type: {complaint.complaint_type}, Description: {complaint.complaint_description}, Created Date: {complaint.created_date}, Resolved Date: {complaint.resolve_date}
        </Text>
      </Page>
    </Document>
  );

  // Pagination calculations
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page handler
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page handler
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredComplaints.length / complaintsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Sidebar onToggle={setSidebarCollapsed} /> {/* Pass function to handle sidebar state */}
      <div className={`content ${sidebarCollapsed ? 'collapsed' : ''}`}> {/* Apply class based on sidebar state */}
        <div><h1 style={{ marginTop: '30px' }} className="text-center flex-grow-1">Complaints Details</h1></div>
        <div className="container mt-4">
          <div className="d-flex justify-content-between mb-4">
            {/* Export All button aligned to the left */}
            <PDFDownloadLink document={<MyDocument />} fileName="complaints.pdf">
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : (
                  <button className="e_button">
                    Export all as Pdf
                  </button>
                )
              }
            </PDFDownloadLink>

            {/* Add Complaint button aligned to the right */}
            <button className="complaint_button_style" onClick={() => handleOpenForm()}>
              Add Complaint
            </button>
          </div>


          {/* Search bar */}
          <div className="d-flex justify-content-end mb-4">
            <input
              type="text"
              placeholder="Search complaints"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control w-25 search-bar"
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
            <h2 style={{ marginBottom: '30px' }}>Complaints List</h2>
            <div className="row">
              {currentComplaints.map((complaint, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="complaint-card p-3">
                    
                    <div className="complaint-card-content">
                    <div className="card-header" style={{ textAlign: "center" }}>
                  ID: {complaint.id}
                </div>
                      <br />
                      <strong>TenantName:</strong> {complaint.tenant_name}
                      <br />
                      <strong>Complaint Type:</strong> {complaint.complaint_type}
                      <br />
                      <strong>Description:</strong> {complaint.complaint_description}
                      <br />
                      <strong>Created Date:</strong> {complaint.created_date}
                      <br />
                      <strong>Resolved Date:</strong> {complaint.resolve_date}
                    </div>
                    <div className="complaint-card-actions mt-2">
                      <div className="complaint-card-icons">
                        {/* Individual export button */}
                        <PDFDownloadLink
                          document={<IndividualComplaintDocument complaint={complaint} />}
                          fileName={`complaint_${complaint.id}.pdf`}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : <FontAwesomeIcon icon={faFileExport} />
                          }
                        </PDFDownloadLink>
                        <button className="btn btn-secondary me-2" onClick={() => handleOpenForm(complaint)}>
                          <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeleteComplaint(complaint.id)}>
                          <FontAwesomeIcon icon={faTrash} /> {/* Trash Icon */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination controls */}
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
