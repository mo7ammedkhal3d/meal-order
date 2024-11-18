import React,{Fragment} from "react";
import mealsImage from '../../assets/images/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "../UI/HeaderCartButton";

const Header = props =>{
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Mael Order</h1>
                <HeaderCartButton/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table full of delicious food!'/>
            </div>
        </Fragment>
    );
}

export default Header;