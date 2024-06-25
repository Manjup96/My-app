import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/Profile.scss';

const UserDetails = () => {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [editData, setEditData] = useState({});
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: user.id }),
                };
                const response = await fetch('https://iiiqbets.com/pg-management/GET-API-Tenants-View.php', requestOptions);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                if (data.length > 0) {
                    setUserDetail(data[0]);
                    setOriginalData(data[0]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user.id]);
    var fetchedData;

    const handleEditClick = async () => {
        try {
            const response = await fetch('https://iiiqbets.com/pg-management/single-TENANT-manager-building-GET-API.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user.id }),
            });
            const data = await response.json();
          
            if (data.length > 0) {
              
                 fetchedData = data[0];
                // alert(`fetchedData.id: ${fetchedData.id}`);
                // alert(`userId: ${userDetail.id}`);
                setEditData({
                    id: fetchedData.id,
                    building_name: fetchedData.building_name,
                    manager_email: fetchedData.manager_email,
                    manager_mobile_no: fetchedData.manager_mobile_no,
                    tenant_name: fetchedData.tenant_name,
                    tenant_email: fetchedData.tenant_email,
                    tenant_mobile: fetchedData.tenant_mobile,
                    tenant_aadhar_number: fetchedData.tenant_aadhar_number,
                    tenant_address: fetchedData.tenant_address,
                    old_tenant_mobile: fetchedData.old_tenant_mobile,
                });
                setEditMode(true);
            } else {
                alert('No data found');
            }
        } catch (error) {
            alert('Error in getting details of user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // Only include changed fields
        const updatedData = {};
        Object.keys(editData).forEach(key => {
            if (editData[key] !== originalData[key]) {
                updatedData[key] = editData[key];
            }
        });

        if (Object.keys(updatedData).length === 0) {
            alert('No changes made.');
            return;
        }
         updateProfile(editData, userDetail, setUserDetail, setOriginalData, setEditMode);
        async function updateProfile(editData, userDetail, setUserDetail, setOriginalData, setEditMode){

      
        try {

           
            // alert(`editData.id: ${editData.id}`);
            const editedmessage = `
        ID: ${editData.id}
        Address: ${editData.tenant_address}
        Email: ${editData.tenant_email}
        Mobile: ${editData.tenant_mobile}
        Name: ${editData.tenant_name}
    `;

    // Display the alert
    // alert("You are about to send the following data: " + editedmessage);

            // alert(`updatedData.tenant_name: ${updatedData.tenant_name}`);
            let updatedmessage = 'You are about to update the following fields:\n';
            Object.keys(updatedData).forEach(key => {
                updatedmessage += `${key}: ${updatedData[key]}\n`;
            });
        
            // Display the alert
            // alert(updatedmessage);
            const response = await fetch('https://iiiqbets.com/pg-management/update-PUT-API-tenant-details-profile.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    id:editData.id,    
                  tenant_address:editData.tenant_address,
              tenant_email: editData.tenant_email,
    tenant_mobile:editData.tenant_mobile,
    tenant_name: editData.tenant_name

                }),
            });
            
            let data;
            data = await response.json();
           
           
            if (data[0].Message.response === 'success') {
                alert('Profile Data Updated successfully');
                setUserDetail({ ...userDetail, ...updatedData });
                setOriginalData({ ...userDetail, ...updatedData });
                setEditMode(false);
            } else {
                alert('Failed to save data');
            }
        } catch (error) {
            console.error('Error in updating user profile details:', error);
            alert('Error in updating user profile details: ' + error.message);
        }
    } 

    };

    const handleBack = () => {
        setEditMode(false);
    };

    return (
        <div className="Profile-card">
            <div className="card-header">
                {editMode ? (
                    <h2 className="Profile-Title">Edit Profile Details</h2>
                ) : (
                    <h2 className="Profile-Title">Profile Details</h2>
                )}
            </div>
            <div className="card-body">
                {editMode ? (
                    <form>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>ID: </b> <input type="text" name="id" value={editData.id} readOnly /></li>
                            {/* <li className="list-group-item"><b>Building Name: </b> <input type="text" name="building_name" value={editData.building_name} readOnly /></li>
                            <li className="list-group-item"><b>Manager Email: </b> <input type="text" name="manager_email" value={editData.manager_email} readOnly /></li>
                            <li className="list-group-item"><b>Manager Mobile Number: </b> <input type="text" name="manager_mobile_no" value={editData.manager_mobile_no} readOnly /></li> */}
                            <li className="list-group-item"><b>Name: </b> <input type="text" name="tenant_name" value={editData.tenant_name} onChange={handleChange} /></li>
                            <li className="list-group-item"><b>Email: </b> <input type="email" name="tenant_email" value={editData.tenant_email} onChange={handleChange} /></li>
                            <li className="list-group-item"><b>Mobile: </b> <input type="text" name="tenant_mobile" value={editData.tenant_mobile} onChange={handleChange} /></li>
                            <li className="list-group-item"><b>Aadhar Number: </b> <input type="text" name="tenant_aadhar_number" value={editData.tenant_aadhar_number} onChange={handleChange} /></li>
                            <li className="list-group-item"><b>Address: </b> <input type="text" name="tenant_address" value={editData.tenant_address} onChange={handleChange} /></li>
                        </ul>
                        <div className="button-group">
                            <button type="button" onClick={handleSave}>Update</button>
                            <button type="button" onClick={handleBack}>Back</button>
                        </div>
                    </form>
                ) : (
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>ID: </b> {userDetail.id}</li>
                        {/* <li className="list-group-item"><b>Building Name: </b> {userDetail.building_name}</li>
                        <li className="list-group-item"><b>Manager Email: </b> {userDetail.manager_email}</li>
                        <li className="list-group-item"><b>Manager Mobile Number: </b> {userDetail.manager_mobile_no}</li> */}
                        <li className="list-group-item"><b>Name: </b> {userDetail.tenant_name}</li>
                        <li className="list-group-item"><b>Email: </b> {userDetail.tenant_email}</li>
                        <li className="list-group-item"><b>Mobile: </b> {userDetail.tenant_mobile}</li>
                        <li className="list-group-item"><b>Aadhar Number: </b> {userDetail.tenant_aadhar_number}</li>
                        <li className="list-group-item"><b>Address: </b> {userDetail.tenant_address}</li>
                        <div className="edit-section">
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={handleEditClick} />
                </div>
                    </ul>
                )}
               
            </div>
        </div>
    );
};

export default UserDetails;
