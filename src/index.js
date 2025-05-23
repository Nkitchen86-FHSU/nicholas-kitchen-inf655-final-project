import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-tailwind/react';
import { CartProvider } from './context/CartContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <CartProvider>
            <App />
        </CartProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
