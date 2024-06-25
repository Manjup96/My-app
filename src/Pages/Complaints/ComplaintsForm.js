


import React, { useState, useEffect } from "react";
import "../../styles/components/ComplaintsForm.scss";
import { useAuth } from '../../context/AuthContext';

const ComplaintsForm = ({ onSubmit, onCloseForm, initialData }) => {
  const { user } = useAuth();
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantMobile, setTenantMobile] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [resolvedDate, setResolvedDate] = useState("");
  const [comments, setComments] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [bedNo, setBedNo] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerMobile, setManagerMobile] = useState("");
  const [response, setResponse] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setComplaintType(initialData.complaint_type || "");
      setDescription(initialData.complaint_description || "");
      setId(initialData.id || "");
      setTenantName(initialData.tenant_name || "");
      setTenantMobile(initialData.tenant_mobile || "");
      setTenantEmail(initialData.tenant_email || "");
      setCreatedDate(initialData.created_date || "");
      setResolvedDate(initialData.resolved_date || "");
      setComments(initialData.comments || "");
      setFloorNo(initialData.floor_no || "");
      setRoomNo(initialData.room_no || "");
      setBedNo(initialData.bed_no || "");
      setBuildingName(initialData.building_name || "");
      setManagerEmail(initialData.manager_email || "");
      setManagerMobile(initialData.manager_mobile || "");
      setResponse(initialData.response || "");
    } else {
      setTenantName(user.username);
      setTenantMobile(user.mobile);
      setTenantEmail(user.email);
      setFloorNo(user.floor_no);
      setRoomNo(user.room_no);
      setBedNo(user.bed_no);
      setBuildingName(user.building_name);
      setManagerEmail(user.manager_email);
      setManagerMobile(user.manager_mobile_no);
    }
  }, [initialData, user]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      complaint_type: complaintType,
      complaint_description: description,
      tenant_name: tenantName,
      tenant_mobile: tenantMobile,
      tenant_email: tenantEmail,
      created_date: createdDate,
      resolved_date: resolvedDate,
      comments,
      floor_no: floorNo,
      room_no: roomNo,
      bed_no: bedNo,
      building_name: buildingName,
      manager_email: managerEmail,
      manager_mobile: managerMobile,
      response: response,
    });


    alert(initialData ? "Successfully updated" : "Successfully added");

    setShowAlert(true);
    setLoading(false);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : initialData ? "Update" : "Submit"}
          </button>
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

