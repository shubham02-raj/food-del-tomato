import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";


const FoodDisplay = ({ category }) => {
  const { list, searchQuery } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {/* {list.map((item, index) => {

          if (category === "All" || category === item.data.category) {
            return (
              <FoodItem
                key={index}
                id={item.id}
                name={item.data.name}
                description={item.data.description}
                price={item.data.price}
                image={item.image}
              />
            );
          }
        })} */}

        {list
          .filter((item) => {
            if (category === "All") {
              return item.data.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            } else {
              return (
                category === item.data.category &&
                item.data.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
            }
          })
          .map((food, index) => {
            return (
              <FoodItem
                key={index}
                id={food.id}
                name={food.data.name}
                description={food.data.description}
                price={food.data.price}
                image={food.image}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;
