import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../../assets/logo.png'

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Perform any necessary logout operations here, such as clearing user data from state or localStorage
    navigate('/login', { replace: true });
    // navigate('/login'); // Redirect to the login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        Jess Kitchen
      </div>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`${styles.list} ${isMenuOpen ? styles.open : ''}`}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/orderstatus">Order Status</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
        {/* <li><Link to={"/home"}>Favorites</Link></li> */}
      </ul>
      {/* <div className={styles.btn}> */}
        {/* <button className={styles.login}>Login</button>
        <button className={styles.register}>Register</button> */}
        {/* <button className={styles.logout} onClick={handleLogout}>Logout</button> */}
      {/* </div> */}
    </div>
  );
}

export default Navbar;
