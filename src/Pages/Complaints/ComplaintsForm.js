// ComplaintsForm.js
import React, { useState } from "react";
import "../../styles/components/ComplaintsForm.scss";

const ComplaintsForm = ({ onSubmit, onCloseForm }) => {
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [resolvedDate, setResolvedDate] = useState("");

  const handleComplaintTypeChange = (e) => {
    setComplaintType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleTenantNameChange = (e) => {
    setTenantName(e.target.value);
  };

  const handleCreateDateChange = (e) => {
    setCreateDate(e.target.value);
  };

  const handleResolvedDateChange = (e) => {
    setResolvedDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id,
      tenantName,
      createDate,
      resolvedDate,
      complaintType,
      description
    });
    setId("");
    setTenantName("");
    setCreateDate("");
    setResolvedDate("");
    setComplaintType("");
    setDescription("");
  };

  const handleClose = () => {
    onCloseForm(); // Call the onCloseForm function passed from the parent if it's a function
  };

  return (
    <div className="complaint-form-popup-overlay">
      <div className="complaint-form-popup-container">
        <h2>Add Complaint</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={handleIdChange}
          />
          <label htmlFor="tenantName">Tenant Name:</label>
          <input
            type="text"
            id="tenantName"
            value={tenantName}
            onChange={handleTenantNameChange}
          />
          <label htmlFor="createDate">Create Date:</label>
          <input
            type="date"
            id="createDate"
            value={createDate}
            onChange={handleCreateDateChange}
          />
          <label htmlFor="resolvedDate">Resolved Date:</label>
          <input
            type="date"
            id="resolvedDate"
            value={resolvedDate}
            onChange={handleResolvedDateChange}
          />
          <label htmlFor="complaintType">Complaint Type:</label>
          <input
            type="text"
            id="complaintType"
            value={complaintType}
            onChange={handleComplaintTypeChange}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintsForm;
