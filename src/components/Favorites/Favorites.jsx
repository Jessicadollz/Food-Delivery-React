import React, { useState, useEffect } from 'react';
import styles from '../Menu/Menu.module.css';
import Chatbot from '../Chatbot/Chatbot';
import Footer from '../../components/Footer/Footer';

function Favorites() {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const removeFavorite = (id) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter(item => item.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <>
        <Chatbot />
        <div className={styles.menu}>
            <h1 style={{ textAlign: "center", fontSize: "3rem", marginTop: "7rem", marginBottom: "2rem" }}>Favorites</h1>
            <div className={styles.menuContainer}>
                {favorites.length > 0 ? (
                    favorites.map(item => (
                        <div className={styles.card} key={item.id}>
                            <div className={styles.icons}>
                                <p className={styles.rating}>
                                    <span>{item.rating}</span>
                                </p>
                            </div>
                            <img src={item.image} alt={item.name} className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <h1 className={styles.name}>{item.name}</h1>
                                <h3 className={styles.price}>₹{item.price} / Serving</h3>
                                <p className={styles.category}>{item.category}
                                <button 
                                    className={styles.remove} 
                                    onClick={() => removeFavorite(item.id)}
                                >
                                    Remove
                                </button>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", marginTop: "2rem" }}>No favorites added yet.</p>
                )}
            </div>
        </div>

        <Footer />
        </>
    );
}

export default Favorites;
