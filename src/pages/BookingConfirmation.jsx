import React from 'react';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout';

function BookingConfirmation() {
    const {cart} = React.useContext(CartContext);

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Thank You For Purchasing Tickets!
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 className="text-lg">
                                Ticket Receipt
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
                                                    <div className="mt-1 flex items-end">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            ${item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                            <section aria-labelledby="summary-heading" className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
                                <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">
                                    Grand Total
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
                                </div>
                            </section>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default BookingConfirmation