// import React, { useState, useEffect } from "react";
// import Sidebar from "../../shared/Sidebar";
// import "../../styles/components/News.scss";
// import { TENANAT_MEALS_URL } from "../../services/ApiUrls";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


// const News = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const requestOptions = {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             "manager_email": "ssy.balu@gmail.com",
//             "building_name": "Building 1",
//             "tenant_mobile": 9876543217
//           }),
//         };
//         const response = await fetch(TENANAT_MEALS_URL, requestOptions);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setNewsData(data);
//         setFilteredData(data); // Initialize filteredData with all news data
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Error fetching data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearchInputChange = (e) => {
//     const searchValue = e.target.value;
//     setSearchInput(searchValue);

//     const filteredNews = newsData.filter(
//       (news) =>
//         news.news_type.toLowerCase().includes(searchValue.toLowerCase()) ||
//         news.id.toString().includes(searchValue) ||
//         news.news_description.toLowerCase().includes(searchValue.toLowerCase()) ||
//         new Date(news.created_at).toLocaleDateString("en-IN").includes(searchValue)
//     );
//     setFilteredData(filteredNews);
//   };

//   return (
//     <div>
//       <Sidebar />
//       <div className="News-Title">
//         <h2>Meals Details</h2>
//       </div>
//       <div className="SearchContainer">
//         <input
//           type="text"
//           placeholder="Search news..."
//           className="search-input"
//           value={searchInput}
//           onChange={handleSearchInputChange} 
//           style={{ marginLeft: '80%' }} 
//         />
//       </div>

//       <div className="TableContainer">
//         {loading && <div>Loading...</div>}
//         {error && <div>Error: {error}</div>}
//         {!loading && !error && (
//           <div className="card-row">
//             {filteredData.map((news, index) => (
//               <div key={index} className="card">
//                 <div className="card-header" style={{ textAlign: "center" }}>
//                   ID: {news.id}
//                 </div>
//                 <div className="card-body">
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>tenant_name: </b> {news.tenant_name}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>breakfast: </b> {news.breakfast}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>lunch: </b> {news.lunch}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>dinner: </b> {news.dinner}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>comments: </b> {news.comments}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>Date :</b>{" "}
//                       {new Date(news.date).toLocaleDateString("en-IN")}
//                     </small>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default News;



// import React, { useState, useEffect } from "react";
// import Sidebar from "../../shared/Sidebar";
// import "../../styles/components/News.scss";
// import { TENANAT_MEALS_URL } from "../../services/ApiUrls";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// const News = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const requestOptions = {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             manager_email: "ssy.balu@gmail.com",
//             building_name: "Building 1",
//             tenant_mobile: 9876543217,
//           }),
//         };
//         const response = await fetch(TENANAT_MEALS_URL, requestOptions);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setNewsData(data);
//         setFilteredData(data); // Initialize filteredData with all news data
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Error fetching data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearchInputChange = (e) => {
//     const searchValue = e.target.value;
//     setSearchInput(searchValue);

//     const filteredNews = newsData.filter(
//       (news) =>
//         news.news_type.toLowerCase().includes(searchValue.toLowerCase()) ||
//         news.id.toString().includes(searchValue) ||
//         news.news_description.toLowerCase().includes(searchValue.toLowerCase()) ||
//         new Date(news.created_at).toLocaleDateString("en-IN").includes(searchValue)
//     );
//     setFilteredData(filteredNews);
//   };

//   const handleEdit = (id) => {
//     // Implement edit functionality (e.g., navigate to edit page)
//     console.log(`Editing news with ID ${id}`);
//   };

//   const handleDelete = (id) => {
//     // Implement delete functionality (e.g., confirm delete and update state or API call)
//     console.log(`Deleting news with ID ${id}`);
//     // Example of removing news from state:
//     const updatedNewsData = newsData.filter((news) => news.id !== id);
//     setNewsData(updatedNewsData);
//     // Update filteredData if needed
//     const updatedFilteredData = filteredData.filter((news) => news.id !== id);
//     setFilteredData(updatedFilteredData);
//   };

//   return (
//     <div>
//       <Sidebar />
//       <div className="News-Title">
//         <h2>News Details</h2>
//       </div>
//       <div className="SearchContainer">
//         <input
//           type="text"
//           placeholder="Search news..."
//           className="search-input"
//           value={searchInput}
//           onChange={handleSearchInputChange}
//         />
//       </div>

//       <div className="TableContainer">
//         {loading && <div>Loading...</div>}
//         {error && <div>Error: {error}</div>}
//         {!loading && !error && (
//           <div className="card-row">
//             {filteredData.map((news, index) => (
//               <div key={index} className="card">
//                 <div className="card-header" style={{ textAlign: "center" }}>
//                   ID: {news.id}
//                   <span className="edit-delete-icons">
//                     <FontAwesomeIcon
//                       icon={faEdit}
//                       onClick={() => handleEdit(news.id)}
//                       style={{ cursor: "pointer", marginLeft: "5px" }}
//                     />
//                     <FontAwesomeIcon
//                       icon={faTrash}
//                       onClick={() => handleDelete(news.id)}
//                       style={{ cursor: "pointer", marginLeft: "5px" }}
//                     />
//                   </span>
//                 </div>
//                 <div className="card-body">
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>tenant_name: </b> {news.tenant_name}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>breakfast: </b> {news.breakfast}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>lunch: </b> {news.lunch}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>dinner: </b> {news.dinner}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>comments: </b> {news.comments}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>Date :</b>{" "}
//                       {new Date(news.date).toLocaleDateString("en-IN")}
//                     </small>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default News;






// import React, { useState, useEffect } from "react";
// import Sidebar from "../../shared/Sidebar";
// import "../../styles/components/News.scss";
// import { TENANAT_MEALS_URL } from "../../services/ApiUrls";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// const News = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const requestOptions = {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             manager_email: "ssy.balu@gmail.com",
//             building_name: "Building 1",
//             tenant_mobile: 9876543217,
//           }),
//         };
//         const response = await fetch(TENANAT_MEALS_URL, requestOptions);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setNewsData(data);
//         setFilteredData(data); // Initialize filteredData with all news data
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Error fetching data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearchInputChange = (e) => {
//     const searchValue = e.target.value;
//     setSearchInput(searchValue);

//     const filteredNews = newsData.filter(
//       (news) =>
//         news.news_type.toLowerCase().includes(searchValue.toLowerCase()) ||
//         news.id.toString().includes(searchValue) ||
//         news.news_description.toLowerCase().includes(searchValue.toLowerCase()) ||
//         new Date(news.created_at).toLocaleDateString("en-IN").includes(searchValue)
//     );
//     setFilteredData(filteredNews);
//   };

//   const handleEdit = (id) => {
//     // Implement edit functionality (e.g., navigate to edit page)
//     console.log(`Editing news with ID ${id}`);
//   };

//   const handleDelete = (id) => {
//     // Implement delete functionality (e.g., confirm delete and update state or API call)
//     console.log(`Deleting news with ID ${id}`);
//     // Example of removing news from state:
//     const updatedNewsData = newsData.filter((news) => news.id !== id);
//     setNewsData(updatedNewsData);
//     // Update filteredData if needed
//     const updatedFilteredData = filteredData.filter((news) => news.id !== id);
//     setFilteredData(updatedFilteredData);
//   };

//   return (
//     <div>
//       <Sidebar />
//       <div className="News-Title">
//         <h2>Meals Details</h2>
//       </div>
//       <div className="SearchContainer">
//         <input
//           type="text"
//           placeholder="Search news..."
//           className="search-input"
//           value={searchInput}
//           onChange={handleSearchInputChange}
//         />
//       </div>

//       <div className="TableContainer">
//         {loading && <div>Loading...</div>}
//         {error && <div>Error: {error}</div>}
//         {!loading && !error && (
//           <div className="card-row">
//             {filteredData.map((news, index) => (
//               <div key={index} className="card">
//                 <div className="card-body">
//                   <div className="card-header">
//                     ID: {news.id}
//                   </div>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>tenant_name: </b> {news.tenant_name}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>breakfast: </b> {news.breakfast}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>lunch: </b> {news.lunch}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>dinner: </b> {news.dinner}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>comments: </b> {news.comments}
//                     </small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       <b>Date :</b>{" "}
//                       {new Date(news.date).toLocaleDateString("en-IN")}
//                     </small>
//                   </p>
//                   <div className="edit-delete-icons">
//                     <FontAwesomeIcon
//                       icon={faEdit}
//                       onClick={() => handleEdit(news.id)}
//                       style={{ cursor: "pointer", marginLeft: "5px" }}
//                     />
//                     <FontAwesomeIcon
//                       icon={faTrash}
//                       onClick={() => handleDelete(news.id)}
//                       style={{ cursor: "pointer", marginLeft: "5px" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default News;

import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import "../../styles/components/News.scss";
import { TENANAT_MEALS_URL } from "../../services/ApiUrls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink, Document } from "@react-pdf/renderer";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "manager_email": "tanandbabu@yahoo.co.in",
            "building_name": "ANB1",
            "tenant_mobile": 9381404011
          }),
        };
        const response = await fetch(TENANAT_MEALS_URL, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNewsData(data);
        setFilteredData(data); // Initialize filteredData with all news data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    const filteredNews = newsData.filter((news) =>
      news.news_type.toLowerCase().includes(searchValue.toLowerCase()) ||
      news.id.toString().includes(searchValue) ||
      news.news_description.toLowerCase().includes(searchValue.toLowerCase()) ||
      new Date(news.created_at).toLocaleDateString("en-IN").includes(searchValue)
    );
    setFilteredData(filteredNews);
  };

  const handleEdit = (id) => {
    console.log(`Editing news with ID ${id}`);
    // Implement edit logic here (navigate to edit page or show modal)
  };

  const handleDelete = (id) => {
    const updatedNewsData = newsData.filter((news) => news.id !== id);
    setNewsData(updatedNewsData);

    const updatedFilteredData = filteredData.filter((news) => news.id !== id);
    setFilteredData(updatedFilteredData);
  };

  const handleExport = () => {
    alert("Export functionality will be implemented here.");
  };

  return (
    <div>
      <Sidebar />
      <div className="News-Title">
        <h2>Meals Details</h2>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <PDFDownloadLink document={<Document />} fileName="Meals.pdf">
          {({ loading }) => (
            <button className="e_button" disabled={loading}>
              {loading ? "Loading document..." : "Export All"}
            </button>
          )}
        </PDFDownloadLink>

        <input
          type="text"
          placeholder="Search news..."
          className="search-input"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="TableContainer">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <div className="card-row">
            {filteredData.map((news, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="card-header">ID: {news.id}</div>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>tenant_name: </b> {news.tenant_name}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>breakfast: </b> {news.breakfast}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>lunch: </b> {news.lunch}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>dinner: </b> {news.dinner}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>comments: </b> {news.comments}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>Date :</b>{" "}
                      {new Date(news.date).toLocaleDateString("en-IN")}
                    </small>
                  </p>
                  <div className="edit-delete-icons">
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => handleEdit(news.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(news.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Trash Icon */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;


