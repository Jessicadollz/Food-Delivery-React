// components/Layout/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default Layout;
