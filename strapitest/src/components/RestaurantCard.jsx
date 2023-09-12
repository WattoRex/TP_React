import React from "react";
import "./RestaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  if (!restaurant.attributes) {
    return null; // Si les attributs du restaurant sont manquants, ne rien afficher
  }

  const { Name, Description, Category } = restaurant.attributes;
  const categoryNames = Category
    ? Category.data.map((cat) => cat.attributes.Name).join(", ")
    : "";

  return (
    <div className="card">
      <h2>{Name}</h2>
      <p>{Description}</p>
      <div className="categories">
        <p>Categories: {categoryNames}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
