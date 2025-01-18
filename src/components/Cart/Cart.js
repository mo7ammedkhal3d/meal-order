import React, { useState, useContext } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import useHttp from "../../hooks/use-http";

const Cart = props =>{

    const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();
    const [newOrder, setNewOrder] = useState(null);

    const createOrder = () => {
        console.log('items is sent');
            
    }
  
    const enterOrderHandler = () => {   
        let orderItems = [];
        for (const item of cartCtx.items) {            
            orderItems.push({
                id: item.id, 
                name: item.name,
                description: item.description,
                price: item.price
            });
        };

        setNewOrder(JSON.stringify({
            date: new Date(),
            orderItems: orderItems
        }));  

        sendOrderRequest({
            url: 'https://react-http-e7d8f-default-rtdb.firebaseio.com/meal-order/orders.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newOrder
        },createOrder);
    };

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {                
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {        
        cartCtx.addItem({
            ...item,
            amount:1,
        })
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => ( 
                <CartItem 
                    key={item.id}
                    name={item.name} 
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}/>
            ))} 
        </ul>
        );


    return(
        <Modal onClose={props.onClose}>
            {isLoading && <p>Loading ...</p>}
            {error && <p className={classes['text-error']}>{error}</p>}
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['buttons--alt']} onClick={props.onClose}>Colse</button>
                {hasItems && <button className={classes.button} onClick={enterOrderHandler}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;