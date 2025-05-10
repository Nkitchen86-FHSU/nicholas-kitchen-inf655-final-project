import React from 'react';
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function EventDetails() {
    const location = useLocation();
    const event = location.state.event;
    const { addToCart } = React.useContext(CartContext);
  return (
    <Layout>
        <section className="flex justify-center items-start min-h-screen pt-5 bg-custom-dark-navy-blue">
            <div className="max-w-6xl px-4 mx-auto">
                <div className="flex flex-wrap mb-24 -mx-4">
                    <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                        <img className="w-full lg:h-[39em] rounded-lg object-cover" src={event.thumbnail} alt="img" />
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                        <div className="bg-orange-100 shadow-md p-6 rounded-xl">
                            <div className="mb-6 ml-20">
                                <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                    {event.title}
                                </h2>
                                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                    <span>Ticket Price: ${event.price}</span>
                                </p>
                            </div>
                            <div className="ml-20 mb-5">
                                <h2>Description: </h2>
                                <p>{event.description}</p>
                            </div>
                            <div className="mb-6 flex justify-center">
                                <button className="max-w-sm bg-amber-500 hover:bg-yellow-600 w-full text-black py-[4px] rounded-lg font-bold" onClick={() => addToCart(event)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  )
}

export default EventDetails;