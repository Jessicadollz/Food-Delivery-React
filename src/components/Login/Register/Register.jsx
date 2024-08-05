import React, { useState } from 'react'
import styles from './Register.module.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
// import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                });
            }
            console.log("User Registered Successfully!");
            // toast.success("User Registered Successfully!!!", {
            //     position: "top-center",
            // });
        } catch(error) {
            console.log(error.message);
            // toast.success(error.message, {
            //     position: "bottom-center",
            // });
        }
    }
  return (
    <>
    <div className={styles.formBox} >
        <form onSubmit={handleRegister}>
            <h3>Sign Up</h3>

            <div className={styles.mb3}>
                <label htmlFor="">First Name: </label>
                <input type="text"
                    className={styles.formControl}    
                    placeholder='First Name'
                    onChange={(e) => setFname(e.target.value)}
                    required
                />
            </div>

            <div className={styles.mb3}>
                <label htmlFor="">Last Name: </label> 
                <input type="text"
                    className={styles.formControl}    
                    placeholder='Last Name'
                    onChange={(e) => setLname(e.target.value)}
                    required
                />
            </div>

            <div className={styles.mb3}>
                <label htmlFor="">Email Address: </label> 
                <input type="email" 
                    className={styles.formControl}
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className={styles.mb3}>
                <label htmlFor="">Password: </label> 
                <input type="password" 
                    className={styles.formControl}
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div> <br />

            <div className={styles.dGrid}>
                <button type='submit' className={styles.btnPrimary}>
                    Sign Up
                </button>
            </div> 
            <p>
          Already Registered? <Link to="/login">Login</Link>
        </p>
        </form>
        </div>
    </>
  )
}

export default Register