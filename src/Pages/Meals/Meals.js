// Meals.js
import React from 'react';
import Sidebar from '../../shared/Sidebar';
import { useMeals } from '../../hooks/useMeals';
import MealsTable from './MealsTable'; // Adjust the import path as necessary

const Meals = () => {
  const { data: mealsData, isLoading, isError, error } = useMeals();

  if (isLoading) return <p>Loading meals...</p>;
  if (isError) return <p>Error fetching meals: {error?.message}</p>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <MealsTable mealsData={mealsData} />
        </div>
      </div>
    </div>
  );
};

export default Meals;
