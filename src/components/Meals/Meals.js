import { Fragment } from 'react';
import MealsSummmery from './MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals=()=>{
    return (
        <Fragment>
            <MealsSummmery/>
            <AvailableMeals/>
        </Fragment>
    );
}

export default Meals;