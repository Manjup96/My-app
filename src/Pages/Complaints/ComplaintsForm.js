


import React, { useState, useEffect } from "react";
import "../../styles/components/ComplaintsForm.scss";

const ComplaintsForm = ({ onSubmit, onCloseForm, initialData }) => {
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [resolvedDate, setResolvedDate] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for showing alert

  useEffect(() => {
    if (initialData) {
      setComplaintType(initialData.complaint_type);
      setDescription(initialData.complaint_description);
      setId(initialData.id || "");
      setTenantName(initialData.tenant_name || "");
      setCreatedDate(initialData.created_date || "");
      setResolvedDate(initialData.resolved_date || "");
    }
  }, [initialData]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hides alert after 3 seconds (adjust as needed)
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      complaint_type: complaintType,
      complaint_description: description,
      id,
      tenant_name: tenantName,
      created_date: createdDate,
      resolved_date: resolvedDate
    });

    setShowAlert(true); // Show alert when form is submitted
  };

  return (
    <div className="complaint-form-popup-overlay">
      <div className="complaint-form-popup-container">
        <h2>{initialData ? "Edit Complaint" : "Add Complaint"}</h2>
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="complaintType">Complaint Type:</label>
          <input
            type="text"
            id="complaintType"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">{initialData ? "Update" : "Submit"}</button>
          <button className="close-button" onClick={onCloseForm}>
            Close
          </button>
        </form>

        {showAlert && (
          <div className="alert-popup">
            <p>Updated successfully</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ComplaintsForm;

