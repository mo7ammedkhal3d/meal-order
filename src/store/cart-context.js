import React,{} from "react";

const CartContext = React.createContext({
    items:[],
    totlaAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{}
});

export default CartContext;

