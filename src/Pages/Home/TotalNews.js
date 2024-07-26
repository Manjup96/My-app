
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import "../../styles/components/Home.scss";
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

const TotalNews = () => {
  const [newsCount, setNewsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://iiiqbets.com/pg-management/total-News-count.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            manager_email: "ssy.balu@gmail.com",
            building_name: "bhadra",
            tenant_mobile: "9381850288"
          })
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        if (result[0].Message.status === 1) {
          setNewsCount(result[0].Message.total_news_count);
        } else {
          setError(result[0].Message.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
    
        <h2 className='news_heading'>News Tracker</h2>
      
    <div className='card-news'>
      <Link to="/news" className="card-link">
      <div className="card-icon">
      <FontAwesomeIcon icon={faNewspaper} size="2x" />
      </div>
      <h2>Total News Count</h2>
      {newsCount ? <p> {newsCount}</p> : <p>No data available</p>}
      </Link>
    </div>
    </div>
  );
};

export default TotalNews;

