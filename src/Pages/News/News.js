import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/Sidebar";
import "../../styles/components/News.scss";
import { TENANAT_NEWS_URL } from "../../services/ApiUrls";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            manager_email: "ssy.balu@gmail.com",
            building_name: "Building 2",
          }),
        };
        const response = await fetch(TENANAT_NEWS_URL, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNewsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="News-Title">
        <h2>News Details</h2>
      </div>
      <div className="TableContainer">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <div className="card-row">
            {newsData.map((news, index) => (
              <div key={index} className="card">
                <div className="card-header" style={{ textAlign: "center" }}>
                  ID: {news.id}
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <small className="text-muted">
                      <b>Type : </b> {news.news_type}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>Description : </b> {news.news_description}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b>Created On :</b>{" "}
                      {new Date(news.created_at).toLocaleDateString("en-IN")}
                    </small>
                  </p>
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
