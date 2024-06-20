import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/UserDetails.scss';

const UserDetails = () => {
  const { user } = useAuth();

  return (
    <div className="user-details-container">
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">Tenant Details</h3>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
            <li className="list-group-item key"> ID: <b>{user.id}</b></li>
            <li className="list-group-item key">Username: {user.username}</li>
          <li className="list-group-item key">Email: {user.email}</li>
          <li className="list-group-item key">Mobile: {user.mobile}</li>
            </ul>
          </div>
        </div>
      
        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">Manager Details</h3>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
            <li className="list-group-item"> Manager Email: {user.manager_email}</li>
            <li className="list-group-item">Manager Number: {user.manager_mobile_no}</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">Building Details</h3>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
            <li className="list-group-item "> Building Name: {user.building_name}</li>
            <li className="list-group-item ">Floor Number: {user.floor_no}</li>
          <li className="list-group-item ">Room Number: {user.room_no}</li>
          <li className="list-group-item ">Bed Number: {user.bed_no}</li>
            </ul>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default UserDetails;
