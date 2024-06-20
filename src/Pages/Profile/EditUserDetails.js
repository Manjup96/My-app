import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/components/EditUserDetails.scss';

const EditUserDetails = ({ user, setIsEditing }) => {
    const [formData, setFormData] = useState({
        building_name: user.building_name,
        manager_email: user.manager_email,
        manager_mobile_no: user.manager_mobile_no,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        floor_no: user.floor_no,
        room_no: user.room_no,
        bed_no: user.bed_no,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('https://iqbetspro.com/pg-management/single-TENANT-manager-building-GET-API.php', formData);
            if (response.data.success) {
                // handle successful response
                setIsEditing(false);
                // Optionally update user context or state here
            } else {
                // handle error response
                alert('Failed to update user details');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            alert('An error occurred while updating user details');
        }
    };

    return (
        <div className="edit-user-details">
            <div className="form-group">
                <label>Building Name</label>
                <input
                    type="text"
                    name="building_name"
                    value={formData.building_name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Manager Email</label>
                <input
                    type="email"
                    name="manager_email"
                    value={formData.manager_email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Manager Mobile Number</label>
                <input
                    type="text"
                    name="manager_mobile_no"
                    value={formData.manager_mobile_no}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Mobile</label>
                <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Floor Number</label>
                <input
                    type="text"
                    name="floor_no"
                    value={formData.floor_no}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Room Number</label>
                <input
                    type="text"
                    name="room_no"
                    value={formData.room_no}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Bed Number</label>
                <input
                    type="text"
                    name="bed_no"
                    value={formData.bed_no}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    );
};

export default EditUserDetails;
