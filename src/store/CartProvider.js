import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state,action) => {
    if(action.type === 'ADD'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else {
            updatedItems =state.items.concat(action.item);
        }

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount,
        };
    }

    if(action.type ==='REMOVE'){
        const removedItemIndex = state.items.findIndex(item => item.id === action.id);
        const removedItem = state.items[removedItemIndex];

        let updatedItems;
        
        if(removedItem.amount > 1){            
            removedItem.amount = removedItem.amount - 1;
            updatedItems= state.items;
            updatedItems[removedItemIndex] = removedItem;

        }else{
            updatedItems = state.items.filter(item => item.id !== action.id);
        }

        const updatedTotalAmount = state.totalAmount - removedItem.price;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount, 
        }
    }

    if(action.type === 'CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
}

const CartProvider = props  =>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const AddItemToCartHandler = item =>{
        dispatchCartAction({type:'ADD', item:item});
    };

    const removeItemFromCartHandler = id =>{
        dispatchCartAction({type:'REMOVE', id:id})
    };

    const clearCartHandler = ()=>{
        dispatchCartAction('CLEAR');
    }

    const cartContext ={ 
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: AddItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };


    return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>);
}

export default CartProvider;