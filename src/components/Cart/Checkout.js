import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import classes from './Checkout.module.css'; 

const isEmpty = value => value.trim().length === 0;
const isFiveChars = value => value.trim().length === 5;

const Checkout = forwardRef((props, ref) => {
    const [formInputValidity,setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

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


        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityValid,
            postalCode: enteredPostalCodeValid
        })


        const formIsValid = enteredNameIsValid && 
        enteredCityValid && 
        enteredStreetIsValid && 
        enteredPostalCodeValid;

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        });
    };

    useImperativeHandle(ref, () => ({
        resetForm: () => {
            nameInputRef.current.value = '';
            streetInputRef.current.value = '';
            postalCodeInputRef.current.value = '';
            cityInputRef.current.value = '';

            setFormInputValidity({
                name: true,
                street: true,
                city: true,
                postalCode: true
            });
        }
    }));

    const nameControlClasses = `${classes.control} ${!formInputValidity.name && classes.invalid}`;
    const streetControlClasses = `${classes.control} ${!formInputValidity.street && classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${!formInputValidity.postalCode && classes.invalid}`;
    const cityControlClasses = `${classes.control} ${!formInputValidity.city && classes.invalid}`;


    return<form  className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameInputRef} type='text' id='name'/>
            {!formInputValidity.name && <p className='text-error'>Please enter valid name</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input ref={streetInputRef} type='text' id='street'/>
            {!formInputValidity.street && <p className='text-error'>Please enter valid street</p>}
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalCodeInputRef} type='text' id='postal'/>
            {!formInputValidity.postalCode && <p className='text-error'>Please enter valid Postal code (five charachters long)</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input ref={cityInputRef} type='text' id='city'/>
            {!formInputValidity.city && <p className='text-error'>Please enter valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' className={'buttons--alt'} onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
        
    </form>;
});

export default Checkout;