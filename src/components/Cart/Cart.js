import React from "react";
import classes from './Card.module.css';
import Modal from "../UI/Modal";

const Cart = props =>{
    const cartItems = <ul className={classes['cart-item']}>{[{
        id:'c1',
        name:'Sushi',
        amount:2,
        price:12.99,}].map(item => (<li>{item.name}</li>))
    }</ul>
    return(<Modal className={classes.cart}>
        <cartItems/>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>35.62</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['buttons--alt']}>Colse</button>
            <button className={classes.button}>Order</button>
        </div>
    </Modal>
    );
}

export default Cart;