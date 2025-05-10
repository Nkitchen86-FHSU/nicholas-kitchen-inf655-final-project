import React, { useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Cart() {
    const {cart, addToCart, removeFromCart, decreaseQuantity} = React.useContext(CartContext);
    const { user, saveOrder } = UserAuth();
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    function handleCheckout() {
        if(cart.length === 0){
            navigate("/");
            alert("No items in cart. Returning to homepage.");
            return;
        }
        const orderDetails = {
            items: cart,
            totalPrice,
            totalQuantity,
        };
        saveOrder(orderDetails);
        navigate("/success");
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2>
                                Items in your shopping cart
                            </h2>
                            <ul className="divide-y divide-gray-200">
                                {cart.map((item, index) => (
                                    <div key={index} className="">
                                        <li className="flex py-6 sm:py-6">
                                            <div className="flex-shrink-0">
                                                <img src={item.thumbnail} alt={item.title} className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-curtain object-center"/>
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <a href="#" className="font-semibold text-black">{item.title}</a>
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button onClick={(e) => {e.preventDefault(); decreaseQuantity(item)}} className="px-2 py-1 text-sm bg-gray-200 rounded">−</button>
                                                        <span className="text-sm font-medium">{item.quantity}</span>
                                                        <button onClick={(e) => {e.preventDefault(); addToCart(item)}} className="px-2 py-1 text-sm bg-gray-200 rounded">+</button>
                                                    </div>
                                                    <div className="mt-1 flex items-end">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            ${item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div className="mb-2 flex">
                                            <div className="ml-6 flex text-sm">
                                                <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0" onClick={() => removeFromCart(item)}>
                                                    <FontAwesomeIcon icon={faTrash} size={12} className="text-red-500"/>
                                                    <span className="text-xs font-medium text-red-500">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                            <section aria-labelledby="summary-heading" className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
                                <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">
                                    Price Details
                                </h2>
                                <div>
                                    <dl className="space-y-1 px-2 py-4">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-gray-800">
                                                Price ({totalQuantity} ticket)
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                ${totalPrice}
                                            </dd>
                                        </div>
                                    </dl>
                                    <div className="px-2 pb-4 font-medium text-green-700">
                                        <div className="flex gap-4 mb-6">
                                            <button className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border-transparent dark:border-gray-700 hover:bg-green-800 w-full text-black py-[4px] rounded-lg font-bold" onClick={handleCheckout}>
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;