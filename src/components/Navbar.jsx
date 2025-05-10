import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="bg-custom-dark-gray sticky top-0 shadow-md">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex justify-between items-center py-2 md:py-4">
          {/* Display ficitonal company name */}
          <div className="text-left">
            <Link to={"/"}>
              <h2 className="font-bold text-gray-50 text-lg md:text-2xl">Ticket Booking</h2>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Display input search */}
            <input 
              type="text" 
              placeholder="Search event title..."
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              className="px-2"
            />
            {/* Send search query to homepage */}
            <button onClick={() => navigate(`/?q=${encodeURIComponent(search)}`)} className="text-gray-200 hover:text-blue-700">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
            {/* Link to login */}
            <Link to={"/login"} className="text-gray-200 hover:text-blue-700">
              <FontAwesomeIcon icon={faUser}/>
            </Link>
            {/* Link to shopping cart */}
            <Link to={"/cart"} className="text-gray-200 hover:text-blue-700">
              <FontAwesomeIcon icon={faShoppingCart}/>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;