import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantForm from "../components/RestaurantForm";

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:1337/api/restaurants?populate=*")
    fetch("http://localhost:1337/api/restaurants?populate=Category")
      .then((response) => response.json())
      .then((data) => setRestaurants(data.data));
  }, []);

  const createRestaurant = (newRestaurant) => {
    // Effectuez la requête POST pour créer un nouveau restaurant
    fetch("http://localhost:1337/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurant),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mettez à jour la liste des restaurants après la création
        setRestaurants([...restaurants, data]);
      })
      .catch((error) => {
        console.error("Error creating restaurant:", error);
      });
  };

  return (
    <div className="App">
      <h1>Restaurant List</h1>
      <div className="conteneur">
        <RestaurantForm onCreateRestaurant={createRestaurant} />
        <div className="restaurant-list">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
