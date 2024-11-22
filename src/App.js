import React,{Fragment,useState } from "react";
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from "./store/CartProvider";


function App() {

  const [cartIsShown,setCartISShown] =useState(false);

  const showCartHandler = () => {
    setCartISShown(true);
  }

  const hideCartHandler = () => {
    setCartISShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
