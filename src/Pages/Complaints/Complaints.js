import React from "react";
import Sidebar from "../../shared/Sidebar";
import '../../styles/components/Complaints.scss';

const Complaints = () => {
  return (
    <div>
      <Sidebar />
      <div className="Complaints-Title">
        <h2>Complaints Details</h2>
      </div>
    </div>
  );
};

export default Complaints;
