import { useState, useContext } from 'react';
import classes from './Checkout.module.css'; 
import useHttp from '../../hooks/use-http';
import CartContext from '../../store/cart-context';

const Checkout = props => {

    const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();
    const [newOrder, setNewOrder] = useState(null);
    const cartCtx = useContext(CartContext);

    const createOrder = () => {

    };

    const confirmHandler = event => {
        event.preventDefault(); 

        let orderItems = [];
        for (const item of cartCtx.items) {            
            orderItems.push({
                id: item.id, 
                name: item.name,
                description: item.description,
                price: item.price
            });
        };

        const orderData = {
            date: new Date(),
            orderItems: orderItems
        };  
    
        setNewOrder(orderData);

        sendOrderRequest({
            url: 'https://react-http-e7d8f-default-rtdb.firebaseio.com/meal-order/orders.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        },createOrder);

    };


    return<form  className={classes.form} onSubmit={confirmHandler}>
        <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name'/>
        </div>
        <div className={classes.control}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street'/>
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal'/>
        </div>
        <div className={classes.control}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city'/>
        </div>
        <div className={classes.actions}>
            <button type='button' className={'buttons--alt'} onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
        
    </form>;
};

export default Checkout;