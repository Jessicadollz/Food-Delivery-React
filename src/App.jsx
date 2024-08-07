import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Menu from './components/Menu/Menu';
import OrderStatus from './components/OrderStatus/OrderStatus';
import Address from './components/Address/Address';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/SignIn/Login';
import Home from './components/Home/Home'
import Register from './components/Login/Register/Register';
import Layout from './components/Layout/Layout';
import Favorites from './components/Favorites/Favorites';
import ProtectedRoute from '../ProtectedRoute';
// import Chatbot from './components/Chatbot/Chatbot';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            {/* <Route path='/chatbot' element={<Chatbot />} /> */}
            <Route path='/menu' element={<ProtectedRoute><Menu cart={cart} setCart={setCart} /></ProtectedRoute>} />
            <Route path='/cart' element={<ProtectedRoute><Cart cart={cart} setCart={setCart} /></ProtectedRoute>} />
            <Route path='/address' element={<ProtectedRoute><Address /></ProtectedRoute>} />
            <Route path='/orderstatus' element={<ProtectedRoute><OrderStatus /></ProtectedRoute>} />
            <Route path='/favorites' element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          </Routes>
        </Layout>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
