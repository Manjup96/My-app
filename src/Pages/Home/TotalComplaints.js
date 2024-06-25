


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
 import "../../styles/components/Home.scss";
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

const TotalComplaints = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            manager_email: user.manager_email,
            building_name: user.building_name,
            tenant_mobile: user.mobile,
          }),
        };
        const response = await fetch("https://iiiqbets.com/pg-management/GET-API-total-complaints-for-tenant-dashboard.php", requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
   
      <div className="card">
      <Link to="/complaints" className='card-link'>
        <div className="card-icon">
          <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
        </div>
        <h2>Total Complaints</h2>
        <p>{data["Total Complaints"]}</p>
        </Link>
      </div>



   
  );
}

export default TotalComplaints;