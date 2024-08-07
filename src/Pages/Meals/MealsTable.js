





import React, { useState, useEffect } from "react";
import "../../styles/components/MealsTable.scss";

const MealsTable = ({ onSubmit, onCloseForm, initialData, view }) => {
  const [id, setId] = useState("");
  const [tenant_name, setTenantname] = useState("");
  const [breakfast, setBreakfast] = useState("No");
  const [lunch, setLunch] = useState("No");
  const [dinner, setDinner] = useState("No");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidComment, setIsValidComment] = useState(false);

  useEffect(() => {
    setIsValidComment(comments.length >= 20);
  }, [comments]);

  useEffect(() => {
    if (initialData) {
      setId(initialData.id || "");
      setTenantname(initialData.tenant_name || "");
      setBreakfast(initialData.breakfast || "No");
      setLunch(initialData.lunch || "No");
      setDinner(initialData.dinner || "No");

      if (initialData.date) {
        const formattedDate = formatDate(initialData.date);
        setDate(formattedDate);
      } else {
        setDate("");
      }

      setComments(initialData.comments || "");
    }
  }, [initialData]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    if (!day || !month || !year) {
      return "";
    }
    const date = new Date(`${year}/${month}/${day}`);
    if (isNaN(date.getTime())) {
      return "";
    }
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');
    return `${formattedYear}/${formattedMonth}/${formattedDay}`;
  };
  const formattedDate = date.split("-").reverse().join("/");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidComment) {
      alert(" Comment should be at least 20 characters long.");
      return;
    }
    setLoading(true);

    onSubmit({
      id: id,
      tenant_name: tenant_name,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      date: date,
      comments: comments
    },
    view
  );

    setLoading(false);

    // Close the form before showing the alert
    onCloseForm(view);

    setTimeout(() => {
      alert(initialData ? "Meals updated Successfully" : "Meals added Successfully");
      window.location.reload();
    }, 100);
  };

  // Get tomorrow's date in YYYY-MM-DD format
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="meals_1">
      <div className="meals_2">
        <h2>{initialData ? "Edit Meal" : " Meal Update"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="meal-option">
            <input
              type="checkbox"
              id="breakfast"
              className="input1"
              checked={breakfast === "Yes"}
              onChange={(e) => setBreakfast(e.target.checked ? "Yes" : "No")}
            />
            <label className="abc" htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="meal-option">
            <input
              type="checkbox"
              id="lunch"
              className="input2"
              checked={lunch === "Yes"}
              onChange={(e) => setLunch(e.target.checked ? "Yes" : "No")}
            />
            <label className="def" htmlFor="lunch">Lunch</label>
          </div>
          <div className="meal-option">
            <input
              type="checkbox"
              id="dinner"
              className="input3"
              checked={dinner === "Yes"}
              onChange={(e) => setDinner(e.target.checked ? "Yes" : "No")}
            />
            <label className="ghi" htmlFor="dinner">Dinner</label>
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              min={minDate} // Set the minimum date to tomorrow's date
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <label htmlFor="comments">Comments:</label>
       
<textarea
            id="comments"
            value={comments}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setComments(e.target.value);
              }
            }}
            maxLength={500}
            required
          ></textarea>
          {!isValidComment && (
            <p style={{ color: "red" }}>Comments should be between 20 and 500 characters.</p>
          )}
          <div className="form_div">
            <button type="submit" disabled={loading || !isValidComment}>
              {loading ? "Submitting..." : initialData ? "Update" : "Submit"}
            </button>
            <button className="close-button" type="button" onClick={onCloseForm}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealsTable;
