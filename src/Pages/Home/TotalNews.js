


// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
//  import "../../styles/components/Home.scss";
// import { useAuth } from "../../context/AuthContext";
// import { Link } from 'react-router-dom';

// const TotalNews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const requestOptions = {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             manager_email: user.manager_email,
//             building_name: user.building_name,
//             tenant_mobile: user.mobile,
//           }),
//         };
//         const response = await fetch("https://iiiqbets.com/pg-management/NEWS-GET-API-manager-bulding.php", requestOptions);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setNewsData(newsData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
   
//       <div className="card">
//       <Link to="/news" className='card-link'>
//         <div className="card-icon">
//           <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
//         </div>
//         <h2>Total News</h2>
//         <p>{newsData["Total News"]}</p>
//         </Link>
//       </div>



   
//   );
// }

// export default TotalNews;




import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import "../../styles/components/Home.scss";
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

const TotalNewsCount = () => {
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
        const response = await fetch("https://iiiqbets.com/pg-management/NEWS-GET-API-manager-bulding.php", requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Response:", data);  // Inspect the API response structure
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

  // Inspecting the data structure to ensure correct access
  console.log("Data state:", data);

  return (
    <div className="card">
      <Link to="/news" className='card-link'>
        <div className="card-icon">
          <FontAwesomeIcon icon={faNewspaper} size="2x" />
        </div>
        <h2>Total News Count</h2>
        <p>{data && data.total_news_count}</p> {/* Adjust this line based on the correct key */}
      </Link>
    </div>
  );
}

export default TotalNewsCount;
