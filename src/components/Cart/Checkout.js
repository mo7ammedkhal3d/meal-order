import { useState, useContext, useRef } from 'react';
import classes from './Checkout.module.css'; 
import useHttp from '../../hooks/use-http';
import CartContext from '../../store/cart-context';

const isEmpty = value => value.trim().length === 0;
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
    const [formInputValidity,setformInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();
    const [newOrder, setNewOrder] = useState(null);
    const cartCtx = useContext(CartContext);

    const createOrder = () => {

    };

    const confirmHandler = event => {
        event.preventDefault(); 

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityValid = !isEmpty(enteredCity);
        const enteredPostalCodeValid = isFiveChars(enteredPostalCode);

        console.log('this is postal code: '+enteredPostalCodeValid);
        

        setformInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityValid,
            postalCodeInputRef: enteredPostalCodeValid
        })

        const formIsValid = enteredNameIsValid && 
        enteredCityValid && 
        enteredStreetIsValid && 
        enteredPostalCodeValid;

        if(!formIsValid){
            return;
        }

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
            <input ref={nameInputRef} type='text' id='name'/>
            {!formInputValidity.name && <p className='text-error'>Please enter valid name</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor='street'>Street</label>
            <input ref={streetInputRef} type='text' id='street'/>
            {!formInputValidity.street && <p className='text-error'>Please enter valid street</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalCodeInputRef} type='text' id='postal'/>
            {!formInputValidity.postalCode && <p className='text-error'>Please enter valid Postal code</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor='city'>City</label>
            <input ref={cityInputRef} type='text' id='city'/>
            {!formInputValidity.city && <p className='text-error'>Please enter valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' className={'buttons--alt'} onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
        
    </form>;
};

export default Checkout;