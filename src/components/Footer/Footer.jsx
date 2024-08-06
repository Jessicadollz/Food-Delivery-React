import React from 'react'
import styles from './Footer.module.css'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <>
        <div className={styles.Footer}>
            <div className={styles.Footer1}>
                <h1>(+91) 9876543210</h1>
                <p>Hyderabad, Telangana, India</p>
            </div>
            <div className={styles.Footer2}>
                <p>Monday - Thursday: 8Am - 7Pm</p>
                <p>Friday - Saturday: 9Am - 9Pm</p>
                <p>Sunday: 10Am - 10Pm</p>
            </div>
            <div className={styles.Footer3}>
            <FaFacebook />
            <FaInstagramSquare />
            <FaTwitter />
            </div>
        </div>
    </>
  )
}

export default Footer