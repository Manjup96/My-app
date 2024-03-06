// MealsTable.js
import React from 'react';

const MealsTable = ({ mealsData }) => {
  return (
    <>
    <h2 className="mt-5">Meals</h2>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Breakfast</th>
          <th>Lunch</th>
          <th>Dinner</th>
          <th>Date</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {mealsData?.map((meal, index) => (
          <tr key={index}>
            <td>{meal.id}</td>
            <td>{meal.breakfast}</td>
            <td>{meal.lunch}</td>
            <td>{meal.dinner}</td>
            <td>{meal.date}</td>
            <td>{meal.comments}</td>
            <td>
              {/* Implement edit and delete actions here */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default MealsTable;
