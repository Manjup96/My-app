// import React, { useState, useEffect } from "react";

// const MealsForm = ({ onSubmit, onCloseForm, initialData }) => {
//   const [formData, setFormData] = useState({
//     id: initialData ? initialData.id : "",
//     breakfast: initialData ? initialData.breakfast : "",
//     lunch: initialData ? initialData.lunch : "",
//     dinner: initialData ? initialData.dinner : "",
//     date: initialData ? initialData.date : "",
//     comments: initialData ? initialData.comments : "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{initialData ? "Edit Meal" : "Add Meal"}</h5>
//             <button type="button" className="close" onClick={onCloseForm}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>ID</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="id"
//                   value={formData.id}
//                   onChange={handleChange}
//                   readOnly={!!initialData}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Breakfast</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="breakfast"
//                   value={formData.breakfast}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Lunch</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="lunch"
//                   value={formData.lunch}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Dinner</label>
//                 <textarea
//                   className="form-control"
//                   name="dinner"
//                   value={formData.dinner}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Comments</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="comments"
//                   value={formData.comments}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={onCloseForm}>
//                 Close
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 {initialData ? "Update Meal" : "Add Meal"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealsForm;

import React, { useState } from 'react';

const MealForm = () => {
  const [formData, setFormData] = useState({
    manager_email: 'tanandbabu@yahoo.co.in',
    building_name: 'ANB1',
    tenant_mobile: '9381404011',
    breakfast: '',
    lunch: '',
    dinner: '',
    date: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://iqbetspro.com/pg-management/POST-Meals-for-tenant-API.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Handle success, e.g., show a success message
        alert('Meal data submitted successfully!');
        // Optionally clear the form
        setFormData({
          ...formData,
          breakfast: '',
          lunch: '',
          dinner: '',
          date: '',
          comments: ''
        });
      } else {
        // Handle server error
        alert('Failed to submit meal data');
      }
    } catch (error) {
      // Handle network error
      alert('Failed to submit meal data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Breakfast:
        <input type="text" name="breakfast" value={formData.breakfast} onChange={handleChange} />
      </label>
      <label>
        Lunch:
        <input type="text" name="lunch" value={formData.lunch} onChange={handleChange} />
      </label>
      <label>
        Dinner:
        <input type="text" name="dinner" value={formData.dinner} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="text" name="date" value={formData.date} onChange={handleChange} />
      </label>
      <label>
        Comments:
        <textarea name="comments" value={formData.comments} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MealForm;





