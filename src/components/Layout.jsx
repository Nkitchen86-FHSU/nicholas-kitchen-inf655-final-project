import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            {/* Display the navbar followed by the page content */}
            <Navbar />
            <div className='main-content min-h-screen'>{children}</div>
        </>
    );
}

export default Layout;