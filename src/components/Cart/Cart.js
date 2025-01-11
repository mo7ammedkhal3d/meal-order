import React, { useContext } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import useHttp from "../../hooks/use-http";

const Cart = props =>{

    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const createOrder = () => {
        let orderItems = {};
    for (const item in cartCtx.items) {
        const generatedId = item.id; 
        orderItems.push({
            id: generatedId, 
            name: item.name,
            description: item.amount,
            price: item.price
        });
    };
  
    const enterOrederHandler = async (taskText) => {
      sendTaskRequest(
        {
          url: 'https://react-http-6b4a6.firebaseio.com/tasks.json',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { text: taskText },
        },
        createTask.bind(null, taskText)
      );
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
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['buttons--alt']} onClick={props.onClose}>Colse</button>
                {hasItems && <button className={classes.button} onClick={createOrder}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;