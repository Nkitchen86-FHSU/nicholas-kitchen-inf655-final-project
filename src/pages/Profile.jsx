import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const { user, getUserOrders, logout } = UserAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getUserOrders();
            setOrders(data);
        };
        fetchOrders();
    }, [getUserOrders]);

    return (
        <div>
            <Layout>
                <div className="bg-teal-400 p-5">
                    <h1 className="text-center text-2xl font-semibold">Profile</h1>
                </div>
                <section className="flex justify-center items-start min-h-screen pt-5 bg-custom-dark-navy-blue">
                   <div className="bg-orange-100 shadow-md p-6 rounded-xl w-1/4 min-w-96">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Username: {user.displayName}</h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Email: {user.email}</h1>
                        <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0" onClick={() => {logout(); navigate("/")}}>
                            <span className="text-s font-bold text-red-500 hover:text-red-700">Logout</span>
                        </button>
                        <h1 className="title-font text-xl font-medium text-gray-900 mt-5 mb-3">Order History</h1>
                        {orders.length > 0 ? 
                            (
                                <ul className="space-y-2">
                                    {orders.map((order, index) => (
                                        <li key={index} className="text-sm text-gray-800">
                                            - {order.totalQuantity} tickets for ${order.totalPrice} on {new Date(order.orderDate.seconds * 1000).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-800">No orders found.</p>
                            )
                        }
                    </div> 
                    {getUserOrders}
                </section>
                
            </Layout>
            
        </div>
    )
}

export default Profile;