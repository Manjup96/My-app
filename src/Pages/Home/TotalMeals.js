
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/components/Home.scss";
import { someIconName } from '@fortawesome/free-regular-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHamburger, faDrumstickBite, faBreadSlice} from '@fortawesome/free-solid-svg-icons';


const MealsData = () => {
  const [mealsData, setMealsData] = useState({
    breakfast_yes_count: 0,
    lunch_yes_count: 0,
    dinner_yes_count: 0,
  });

  useEffect(() => {
    // Replace the URL with the actual endpoint
    fetch('https://iiiqbets.com/pg-management/total-Meals-Count-Tenant.php')
      .then(response => response.json())
      .then(data => {
        if (data[0].Message.response === 'success' && data[0].Message.status === 1) {
          setMealsData({
            breakfast_yes_count: data[0].Message.breakfast_yes_count,
            lunch_yes_count: data[0].Message.lunch_yes_count,
            dinner_yes_count: data[0].Message.dinner_yes_count,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching the meals data:', error);
      });
  }, []);

  return (
    <div>
      <div>
        <h2 className='meals_heading '>Meals Data</h2>
      </div>

      <div className='main_meals'>
    <div className="card" >
      <Link to="/meals" className="card-link">
      <FontAwesomeIcon className='card-icon' icon={faBreadSlice} size="2x" />
        <h2>Breakfast Count</h2>
        <p> {mealsData.breakfast_yes_count}</p>
      </Link>
    </div>
    <div className="card" >
      <Link to="/meals" className="card-link">
      <FontAwesomeIcon className='card-icon' icon={faHamburger} size="2x" />
        <h2 > Lunch Count</h2>
        <p>{mealsData.lunch_yes_count}</p> 
      </Link>
    </div>
    <div className="card" >
      <Link to="/meals" className="card-link">
      <FontAwesomeIcon className='card-icon' icon={faDrumstickBite} size="2x" />
        <h2>Dinner Count </h2>
        <p> {mealsData.dinner_yes_count} </p>
      </Link>
    </div>
    </div>
    </div>
  );
};
export default MealsData;

