


import React, { useState, useEffect } from "react";

import '../../styles/components/MealsTable.scss';

const ComplaintsForm = ({ onSubmit, onCloseForm, initialData }) => {
  const [id, setId] = useState("");
  const [tenant_name, setTenantname] = useState("");
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [date, setDate] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (initialData) {
      setId(initialData.id || "");
      setTenantname(initialData.tenant_name || "");
      setBreakfast(initialData.breakfast || false);
      setLunch(initialData.lunch || false);
      setDinner(initialData.dinner || false);
      setDate(initialData.date || "");
      setComments(initialData.comments || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: id,
      tenant_name: tenant_name,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      date: date,
      comments: comments
    });
  };

  return (
    <div className="complaint-form-popup-overlay">
      <div className="complaint-form-popup-container">
        <h2>{initialData ? "Edit Meal" : "Add Meal"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="meal-option">
            <input
              type="checkbox"
              id="breakfast"
              className="input1"
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
            />
            <label className="abc" htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="meal-option">
            <input
              type="checkbox"
              id="lunch"
              className="input2"
              checked={lunch}
              onChange={(e) => setLunch(e.target.checked)}
            />
            <label  className="def" htmlFor="lunch">Lunch</label>
          </div>
          <div className="meal-option">
            <input
              type="checkbox"
              id="dinner"
              className="input3"
              checked={dinner}
              onChange={(e) => setDinner(e.target.checked)}
            />
            <label   className="ghi" htmlFor="dinner">Dinner</label>
          </div>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
          <div>
          <button type="submit">{initialData ? "Update" : "Submit"}</button>
          <button className="close-button" onClick={onCloseForm}>
          Close
        </button>
        </div>
        </form>
        </div>
      
    </div>
  );
};

export default ComplaintsForm;
