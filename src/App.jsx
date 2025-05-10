import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import BookingConfirmation from './pages/BookingConfirmation';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/*" element={<PageNotFound />}/>
        <Route path="/event/:eventId" element={<EventDetails />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" element={<BookingConfirmation />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;