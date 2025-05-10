import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='main-content min-h-screen'>{children}</div>
        </>
    );
}

export default Layout;