import React from "react";

export const CartContext = React.createContext();
export const CartProvider = ({children}) => {
    const [cart, setCart] = React.useState([]);

    // Add to the cart
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

    // Decrease the quantity from the cart
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

    // Remove all tickets of that type from the cart
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