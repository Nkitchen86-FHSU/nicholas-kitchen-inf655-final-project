import React, { useEffect, useState } from 'react';
import upcomingEvents from '../data/data';
import { useLocation, useNavigate } from 'react-router-dom';

function HomepageEvents() {
    const navigate = useNavigate();
    const location = useLocation();
    const search = location.search;
    const [events, setEvents] = useState([]);

    /* Set the events depending if a search was committed or not */
    useEffect(() => {
    const query = new URLSearchParams(search).get("q");
    if (query) {
        const filteredEvents = upcomingEvents.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase())
        );
        setEvents(filteredEvents);
    } else {
        setEvents(upcomingEvents);
    }
    }, [search]);

    /* Sort events by price depending on order */
    function handlePriceSort(order){
        let newEvents = [...events];
        if(order === "ascending"){
            newEvents.sort((a,b) => a.price - b.price);
        } else {
            newEvents.sort((a,b) => b.price - a.price);
        }
        setEvents(newEvents);
    }

    /* Sort events by date depending on order */
    function handleDateSort(order) {
        let newEvents = [...events];
        if(order === "ascending"){
            newEvents.sort((a,b) => new Date(a.date) - new Date(b.date));
        } else {
            newEvents.sort((a,b) => new Date(b.date) - new Date(a.date));
        }
        setEvents(newEvents);
    }

    /* Map out events if there are any */
    function mapEvents() {
        if(events.length !== 0){
            return events.map((item,index) => {
                const {thumbnail, title, date, location, price} = item;
                    return(
                    <div key={index} className="p-4 w-full md:w-1/4">
                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md">
                            {/* Navigate to the event with the corresponding index. Pass the event item to the state to be used in EventDetails */}
                            <img className="lg:h-80 h-96 w-full object-cover cursor-pointer" onClick={() => navigate(`/event/${index}`, {state: { event: item } })} src={thumbnail} alt="img" />
                            <div className="p-6 bg-orange-100">
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Date: {date}</h1>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Location: {location}</h1>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Price: ${price}</h1>
                            </div>
                        </div>
                    </div>
                    )
            })
        } else{
            return(
                <div className="p-4 w-full md:w-1/4">
                    <div className="h-full bg-orange-100 border border-gray-300 rounded-xl overflow-hidden shadow-md flex items-center justify-center">
                        <h1 className="title-font text-lg font-medium text-gray-900 m-3">No Events Found</h1>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="bg-teal-400 p-5">
                <h1 className="text-center text-2xl font-semibold">Events</h1>
            </div>
            <section className="min-h-screen text-gray-800 body-font bg-custom-dark-navy-blue">
                {/* Give sorting options */}
                <div className="container px-10 pt-10 mx-auto">
                    <div className="p-4 w-full md:w-1/4 bg-orange-100 border border-gray-300 rounded-xl overflow-hidden shadow-md ">
                        <h1 className="text-2xl font-semibold">Sort By</h1>
                        <div className="flex justify-between items-center w-full my-2">
                            <h2 className="text-lg font-semibold">Price:</h2>
                            <div className="flex space-x-2">
                                <button className="px-2 py-1 bg-blue-700 hover:bg-blue-900 text-gray-200 rounded" onClick={() => handlePriceSort("ascending")}> Ascending</button> 
                                <button className="px-2 py-1 bg-blue-700 hover:bg-blue-900 text-gray-200 rounded" onClick={() => handlePriceSort("descending")}> Descending</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <h2 className="text-lg font-semibold">Date:</h2>
                            <div className="flex space-x-2">
                                <button className="px-2 py-1 bg-blue-700 hover:bg-blue-900 text-gray-200 rounded" onClick={() => handleDateSort("ascending")}> Ascending</button> 
                                <button className="px-2 py-1 bg-blue-700 hover:bg-blue-900 text-gray-200 rounded" onClick={() => handleDateSort("descending")}> Descending</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map Out Each Event */}
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap m-4">
                        {mapEvents()}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomepageEvents;