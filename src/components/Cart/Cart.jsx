import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import Chatbot from '../Chatbot/Chatbot';

function Cart({ cart, setCart }) {
  const [address, setAddress] = useState('');
  const [isAddressVisible, setIsAddressVisible] = useState(true); // Initially visible
  const navigate = useNavigate();

  const handleIncrease = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Show alert indicating that the address has been saved
    alert('Address saved successfully!');
    setIsAddressVisible(false); // Hide address form
  };

  const handlePayment = () => {
    const totalAmount = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const options = {
      key: "rzp_test_w14dnADMuDa97D", // Enter the Key ID generated from the Dashboard
      amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 refers to 100 paise
      currency: "INR",
      name: "Your Company Name",
      description: "Food Payment Transaction",
      image: "logo",
      handler: function (response) {
        const order_id = `order_${Math.floor(Math.random() * 1000000000)}`;
        const signature = `sig_${Math.floor(Math.random() * 1000000000)}`;

        navigate('/orderstatus', {
          state: {
            orderDetails: {
              payment_id: response.razorpay_payment_id,
              order_id: order_id,
              signature: signature,
              items: cart,
              address: address // Pass the address along with other details
            },
          },
        });
      },
      prefill: {
        name: "Amigo",
        email: "",
        contact: "9876543210"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
    <Chatbot />
    <h1 style={{textAlign: "center", marginTop: "8rem"}}>Your Cart</h1>
      <div className={styles.container}>
        {cart.map((item) => (
          <div className={styles.card} key={item.id}>
            <h1>{item.name}</h1>
            <h3>Rs. {item.price}</h3>
            <img src={item.image} alt={item.name} />
            <div className={styles.btn}>
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <span>{item.quantity || 1}</span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
            </div>
            <button className={styles.remove} onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <h1>Total Payment: Rs. {cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)}</h1>
        
        {isAddressVisible ? (
          <form onSubmit={handleAddressSubmit} className={styles.addressForm}>
            <label>
              Delivery Address: <br /> <br />
              <textarea
                value={address}
                onChange={handleAddressChange}
                required
                placeholder="Enter your delivery address"
              />
            </label>
            <button type="submit" className={styles.submitAddress}>Save Address</button>
          </form>
        ) : (
          <button className={styles.proceed} onClick={handlePayment}>Proceed Payment</button>
        )}
      </div>
    </>
  );
}

export default Cart;