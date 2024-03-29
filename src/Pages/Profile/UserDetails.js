import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/Profile.scss';

const UserDetails = () => {
    const { user } = useAuth();

  return (
        <div className="Profile-card">
                  
                  <div className="card-header">
                  <h2 className="Profile-Title">Profile Details</h2>
                  </div>
                  <div className="card-body" >
      <ul className="list-group list-group-flush">

<li className="list-group-item"> <b>Building Name: </b> {user.building_name}</li>
<li className="list-group-item">Manager Email: {user.manager_email}</li>
<li className="list-group-item">Manager Mobile Number: {user.manager_mobile_no}</li>
<li className="list-group-item">Username: {user.username}</li>
<li className="list-group-item">Email: {user.email}</li>
<li className="list-group-item">Mobile: {user.mobile}</li>
<li className="list-group-item">Floor Number: {user.floor_no}</li>
<li className="list-group-item">Room Number: {user.room_no}</li>
<li className="list-group-item">Bed Number: {user.bed_no}</li>
<li className="list-group-item">ID: {user.id}</li>
</ul>
</div>
    </div>
  );
};

export default UserDetails;
