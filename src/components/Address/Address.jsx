import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Address.module.css';

function Address() {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/orderstatus', {
      state: {
        orderDetails: {
          ...orderDetails,
          address,
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Enter Your Address</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Address;
