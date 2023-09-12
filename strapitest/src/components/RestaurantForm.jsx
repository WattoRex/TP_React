// RestaurantForm.js
import React, { useState } from "react";

const RestaurantForm = ({ onCreateRestaurant }) => {
  const [restaurantData, setRestaurantData] = useState({
    Name: "",
    Description: "",
    Category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateRestaurant(restaurantData);
    // Réinitialisez le formulaire après la création
    setRestaurantData({
      Name: "",
      Description: "",
      Category: "",
    });
  };

  return (
    <div className="restaurant-form">
      <h2>Create a New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={restaurantData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <textarea
            id="Description"
            name="Description"
            value={restaurantData.Description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Category">Category:</label>
          <input
            type="text"
            id="Category"
            name="Category"
            value={restaurantData.Category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default RestaurantForm;
