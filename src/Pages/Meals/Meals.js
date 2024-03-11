// Meals.js
import React from "react";
import Sidebar from "../../shared/Sidebar";
import { useMeals } from "../../hooks/useMeals";
import MealsTable from "./MealsTable"; 
import '../../styles/components/Meals.scss';

const Meals = () => {
  const { data: mealsData, isLoading, isError, error } = useMeals();

  if (isLoading) return <p>Loading meals...</p>;
  if (isError) return <p>Error fetching meals: {error?.message}</p>;

  return (
    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="col-md-3">
    //       <Sidebar />
    //     </div>
    //     <div className="col-md-9">
    //       <MealsTable mealsData={mealsData} />
    //     </div>
    //   </div>
    // </div>

    <div>
      <Sidebar />
      <div className="Meals-Title">
        <h2>Meals Details</h2>
        <div className="col-md-9">
          <MealsTable mealsData={mealsData} />
         </div>
      </div>
    </div>
  );
};

export default Meals;
