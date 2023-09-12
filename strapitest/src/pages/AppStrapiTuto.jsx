import { useCallback, useEffect, useState, useId } from "react";
import RestaurantCard from "../components/RestaurantCard";

// Parses the JSON returned by a network request
const parseJSON = (resp) => (resp.json ? resp.json() : resp);

// Checks if a network request came back fine, and throws an error if not
const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  return parseJSON(resp).then((resp) => {
    throw resp;
  });
};

const headers = { "Content-Type": "application/json" };

const Checkbox = ({ name, isChecked, onAddCategory, onRemoveCategory }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={isChecked ? onRemoveCategory : onAddCategory}
        name="categories"
        id={id}
      />
    </div>
  );
};

const App = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(null);
  const [modifiedData, setModifiedData] = useState({
    categories: [],
    description: "",
    name: "",
  });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:1337/api/restaurants?populate=*")
    fetch("http://localhost:1337/api/restaurants?populate=Category")
      .then((response) => response.json())
      .then((data) => setRestaurants(data.data));
  }, []);

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:1337/api/restaurants", {
      headers,
      method: "POST",
      body: JSON.stringify({ data: modifiedData }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:1337/api/categories", { headers, method: "GET" })
      .then(checkStatus)
      .then(parseJSON)
      .then(({ data }) => setAllCategories(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Restaurants</h3>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={modifiedData.name}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            value={modifiedData.description}
          />
        </label>
        <div>
          <br />
          <b>Select categories</b>
          {allCategories.map(({ id, attributes }) => (
            <Checkbox
              key={id}
              name={attributes.Name}
              isChecked={modifiedData.categories.includes(id)}
              onAddCategory={() => {
                const nextData = {
                  ...modifiedData,
                  categories: [...modifiedData.categories, id],
                };
                setModifiedData(nextData);
              }}
              onRemoveCategory={() => {
                const nextData = {
                  ...modifiedData,
                  categories: modifiedData.categories.filter(
                    (catId) => catId !== id
                  ),
                };
                setModifiedData(nextData);
              }}
            />
          ))}
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>Restaurant List</h1>
      <div className="conteneur">
        <div className="restaurant-list">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
