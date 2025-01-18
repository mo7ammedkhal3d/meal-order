import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';


const MealItem = props => {

const price = `$${props.price.toFixed(2)}`;

    const cartCtx = useContext(CartContext);

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            description: props.description,
            amount: amount,
            price: props.price,
        })
    }

    const RemoveFromCartHandler = props => {
        cartCtx.removeItem(props.id)
    }

    return(
        <li className={classes.meal}>
            <div>
                <h3 >{props.name}</h3>
                <div className={classes.description}>
                    {props.description}
                </div>
                <div className={classes.price}>
                    {price}
                </div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} onRemoveFromCart={RemoveFromCartHandler}/>
            </div>
        </li>
    );
}

export default MealItem;