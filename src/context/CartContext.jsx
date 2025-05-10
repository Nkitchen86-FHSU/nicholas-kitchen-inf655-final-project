import React from "react";

export const CartContext = React.createContext();
export const CartProvider = ({children}) => {
    const [cart, setCart] = React.useState([]);

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if(existingItem) {
            setCart(
                cart.map((cartItem) => 
                    cartItem.id === item.id
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
                )
            );
        } else {
            setCart([...cart, {...item, quantity: 1}])
        }
        console.log(cart);
    };

    const decreaseQuantity = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem.quantity === 1) {
            removeFromCart(item);
        } else {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            );
        }
    };

    const removeFromCart = (item) => {
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
        console.log(cart);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    )
}