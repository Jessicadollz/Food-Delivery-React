import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
// import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("User LoggedIn Successfully!!!");
            window.location.href = "/menu";
            // toast.success("User LoggedIn Successfully!!!", {
            //     position: "top-center",
            // });
        } catch (error) {
            console.log(error.message);
            // toast.error(error.message, {
            //     position: "bottom-center",
            // });
        }
    };

    return (
        <div className={styles.formBox}>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>

                <div className={styles.formContainer}>
                    <label>Email Address:</label>
                    <input 
                        type="email" 
                        className={styles.formControl} 
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.formContainer}>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        className={styles.formControl} 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles.dGrid}>
                    <button type="submit" className={styles.btnPrimary}>
                        Submit
                    </button>
                </div>
                
                <p>
                    Not a User? <Link to="/signup">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
