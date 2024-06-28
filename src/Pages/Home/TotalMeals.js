

// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
// import "../../styles/components/Home.scss";
// import { useAuth } from "../../context/AuthContext";
// import { Link } from 'react-router-dom';

// const TotalMeals = () => {
//   const [data, setData] = useState([]);
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
//         const response = await fetch("https://iiiqbets.com/pg-management/total-Meals-Count-Tenant.php", requestOptions);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setData(data);
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
//     <div className="card">
//       <Link to="/meals" className="card-link">
//         <div className="card-icon">
//           {/* <FontAwesomeIcon icon={faDollarSign} size="2x" /> */}
//         </div>
//         <h2>Total Meals</h2>
//         <p>{data[0]["Total Meals"]}</p>
//       </Link>
//     </div>
//   );
// }

// export default TotalMeals;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import "../../styles/components/Home.scss";
// import { faUtensils } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';





// const MealsData = () => {
//   const [mealsData, setMealsData] = useState({
//     breakfast_yes_count: 0,
//     lunch_yes_count: 0,
//     dinner_yes_count: 0,
//   });

//   useEffect(() => {
//     // Replace the URL with the actual endpoint
//     fetch('https://iiiqbets.com/pg-management/total-Meals-Count-Tenant.php')
//       .then(response => response.json())
//       .then(data => {
//         if (data[0].Message.response === 'success' && data[0].Message.status === 1) {
//           setMealsData({
//             breakfast_yes_count: data[0].Message.breakfast_yes_count,
//             lunch_yes_count: data[0].Message.lunch_yes_count,
//             dinner_yes_count: data[0].Message.dinner_yes_count,
//           });
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching the meals data:', error);
//       });
//   }, []);

//   return (

//     <div className="card" >
//       <Link to="/meals" className="card-link">
//       <FontAwesomeIcon className='card-icon' icon={faUtensils} size="2x" />

//         <h2>Meals Data</h2>
//         <p >Breakfast Count: {mealsData.breakfast_yes_count}</p>
//         <p > Lunch Count: {mealsData.lunch_yes_count}</p>
//         <p >Dinner Count: {mealsData.dinner_yes_count}</p>
//       </Link>
//     </div>
    
    
//   );
// };

// export default MealsData;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/components/Home.scss";
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHamburger, faDrumstickBite, faBacon, faSandwich, faPizzaSlice, faBreadSlice} from '@fortawesome/free-solid-svg-icons';
import { faRegularIconName } from '@fortawesome/free-regular-svg-icons'; // Example for a regular icon







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
      {/* <FontAwesomeIcon className='card-icon' icon={faCoffee} size="2x" /> */}
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
      {/* <FontAwesomeIcon className='card-icon' icon={faPizzaSlice} size="2x" /> */}

        <h2>Dinner Count </h2>
        <p> {mealsData.dinner_yes_count} </p>
      </Link>
    </div>
    </div>
    </div>
  );
};

export default MealsData;

