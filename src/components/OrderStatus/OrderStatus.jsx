import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './OrderStatus.module.css';

function OrderStatus() {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(() => {
    const savedOrderDetails = localStorage.getItem('orderDetails');
    return savedOrderDetails ? JSON.parse(savedOrderDetails) : null;
  });

  useEffect(() => {
    if (location.state && location.state.orderDetails) {
      const { orderDetails } = location.state;
      setOrderDetails(orderDetails);
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }
  }, [location.state]);

  if (!orderDetails) {
    return <h2>No Order Details Found</h2>;
  }

  const items = orderDetails.items || [];

  // Group items by name and calculate quantities
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { ...item, quantity: 0 };
    }
    acc[item.name].quantity += item.quantity || 1;
    return acc;
  }, {});

  // Convert grouped items back to an array
  const groupedItemsArray = Object.values(groupedItems);

  // Calculate the total price
  const totalPrice = groupedItemsArray.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (
    <div className={styles.container}>
      <h1 style={{marginBottom: "1rem"}}>Order Status</h1>
      <div className={styles.receipt}>

        <div className={styles.ids}>
          <p><span>Payment ID: </span>{orderDetails.payment_id}</p>
          <p><span>Order ID: </span>{orderDetails.order_id}</p>
          <p><span>Address: </span>{orderDetails.address}</p> 
        </div>
        <div className={styles.quan}>
          <h2>Ordered Items:</h2>
          <div className={styles.items}>
            {groupedItemsArray.length > 0 ? (
              groupedItemsArray.map((item) => (
                <div className={styles.item} key={item.id}>
                  <h3>Quantity: {item.quantity} - {item.name} </h3>
                </div>
              ))
            ) : (
              <p style={{textAlign: "center" , marginTop: "10rem"}}>No items ordered</p>
            )}
          </div>
          <h3 style={{fontSize: "1.3rem", color: "navy"}}> <span>Total Order Price: Rs.</span> {totalPrice}</h3>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
