import React from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../shared/Sidebar";
import UserDetails from "./UserDetails";
const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <UserDetails />
          </div>
        </div>
      </div> */}

      <Sidebar />
      <div className="Profile-Title">
        {/* <h2>Profile Details</h2> */}
        <div className="col-md-9">
            <UserDetails />
          </div>
      </div>
    
    </div>
  );
};

export default Profile;
