import React, { useEffect, useState } from "react";
import { Card } from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import { MealItem } from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealList, setMealList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://react-http-fd1aa-default-rtdb.firebaseio.com/meal-list/-NFtFN4dVXxiEEHHv0Sn.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        let loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMealList(loadedMeals);
      } catch (error) {
        setError(error.message);
        console.log("Something went wrong!");
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const mealsList = mealList.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}>
      {meal.name}
    </MealItem>
  ));

  let content = <p>Found no movies.</p>;

  if (mealList.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  if (error) {
    content = <p>Error: {error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
