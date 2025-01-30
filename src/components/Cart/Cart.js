import React, { useState, useContext, useRef } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from '../../hooks/use-http';

const Cart = props =>{

    const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();
    const [isCheckout,setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const checkoutRef = useRef(null);
    const [sentSuccess,setSentSuccess] = useState(false);

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

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const dataFormat = (data)=>{
        console.log(data);    
        cartCtx.items=[];
        cartCtx.totalAmount=0;
        checkoutRef.current.resetForm();
        setIsCheckout(false);
        setSentSuccess(true);
        setTimeout(() => {
            setSentSuccess(false);
        }, 2000);
    }


    const submitOrderHandler = (userData) => {
        sendOrderRequest({
            url: 'https://react-http-e7d8f-default-rtdb.firebaseio.com/meal-order/orders.json',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                orederDate: new Date(),
                user: userData,
                orderedItems: cartCtx.items
            }
        },dataFormat);
    };

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

        const myActions = <div className={classes.actions}>
            <button className={classes['buttons--alt']} onClick={props.onClose}>Colse</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>

    return(
        <Modal onClose={props.onClose}>
            {error &&<p className="error-text">{error}</p>}
            {isLoading && <div className={classes['cart-spinner']}>
                <span></span>
            </div>}
            {sentSuccess && <div className={classes['sent-success']}>
                <p>Your order is Sent successfully 🥰</p>
            </div>}
            <div className={classes['cart-body']}>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                {isCheckout && <Checkout ref={checkoutRef} onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
                {!isCheckout && myActions}
            </div>
        </Modal>
    );
}

export default Cart;