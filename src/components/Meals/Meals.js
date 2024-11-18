import { Fragment } from 'react';
import MealsSummmery from './MealsSummery';
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