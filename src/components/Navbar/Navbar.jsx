import React from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform any necessary logout operations here, such as clearing user data from state or localStorage
    
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="./src/assets/logo.png" alt="logo" />
        Jess Kitchen
      </div>
      <ul className={styles.list}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/orderstatus">Order Status</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        {/* <li><Link to={"/home"}>Favorites</Link></li> */}
      </ul>
      <div className={styles.btn}>
        {/* <button className={styles.login}>Login</button>
        <button className={styles.register}>Register</button> */}
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
