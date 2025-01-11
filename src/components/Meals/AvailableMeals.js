import { React, useState, useEffect } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';

const AvailableMeals = ()=>{

  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];

      for (const mealKey in mealsObj) {
        loadedMeals.push({ 
          id: mealKey, 
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals(
      { url: 'https://react-http-e7d8f-default-rtdb.firebaseio.com/meal-order/availableMeals.json'},
      transformMeals
    );
  }, [fetchMeals]);
    
    let content;

    if(meals.length > 0){
      content = meals.map( meal =>
        (<MealItem 
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />)
      );
    } if(error){
      content = <p>{error}</p>
    }if(isLoading){
      content = <p>Is loading ...</p>
    }
    
    return(
        <section className={classes.meals}>
            <Card>
              <ul>
                {content}
              </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;