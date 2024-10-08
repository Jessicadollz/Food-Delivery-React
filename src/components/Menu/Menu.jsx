import React, { useState, useEffect } from 'react';
import styles from '../Menu/Menu.module.css';
import menuData from '../Data/Data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import Chatbot from '../Chatbot/Chatbot';
import Footer from '../Footer/Footer.jsx';

function Menu({ cart, setCart }) {
    const [favorites, setFavorites] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState(null);
    const [addedItems, setAddedItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);

        const storedAddedItems = JSON.parse(localStorage.getItem('addedItems')) || [];
        setAddedItems(storedAddedItems);
    }, [setCart]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        const addedItemsIds = cart.map(item => item.id);
        setAddedItems(addedItemsIds);
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (item) => {
        setFavorites((prevFavorites) => {
            const isFavorited = prevFavorites.some(favoriteItem => favoriteItem.id === item.id);
            if (isFavorited) {
                return prevFavorites.filter(favoriteItem => favoriteItem.id !== item.id);
            } else {
                return [...prevFavorites, item];
            }
        });
    };

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption ? selectedOption.value : null);
    };

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem);
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });

        setAddedItems((prevAddedItems) => [...prevAddedItems, item.id]);
    };

    const categories = [...new Set(menuData.map(item => item.category))].map(category => ({ value: category, label: category }));
    const sortOptions = [
        { value: 'priceAsc', label: 'Price: Low to High' },
        { value: 'priceDesc', label: 'Price: High to Low' },
        { value: 'ratingAsc', label: 'Rating: Low to High' },
        { value: 'ratingDesc', label: 'Rating: High to Low' }
    ];

    const sortedMenuData = [...menuData]
        .filter(item => selectedCategories.length === 0 || selectedCategories.includes(item.category))
        .sort((a, b) => {
            switch (sortOption) {
                case 'priceAsc':
                    return a.price - b.price;
                case 'priceDesc':
                    return b.price - a.price;
                case 'ratingAsc':
                    return a.rating - b.rating;
                case 'ratingDesc':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

    return (
        <>
        <Chatbot />
        <div className={styles.menu}>
            <h1 style={{ textAlign: "center", fontSize: "4rem", marginTop: "5rem" }}>Menu</h1>
            <div className={styles.search}>
                <div className={styles.selCat}>
                    <Select placeholder="Select Categories here..."
                        id="categorySelect"
                        options={categories}
                        isMulti
                        onChange={handleCategoryChange}
                        className="searchSelect"
                        classNamePrefix="searchSelect"
                    />
                </div>
                <div className={styles.selSort}>
                    <Select
                        placeholder="Sort Here.."
                        id="sortSelect"
                        options={sortOptions}
                        onChange={handleSortChange}
                        className="searchSelect"
                        classNamePrefix="searchSelect"
                    />
                </div>
            </div>

            <div className={styles.menuContainer}>
                {sortedMenuData.map(item => (
                    <div className={styles.card} key={item.id}>
                        <div className={styles.icons}>
                            <p className={styles.rating}>
                                <span>{item.rating}</span>
                            </p>
                            <button
                                className={`${styles.heart} ${favorites.some(favItem => favItem.id === item.id) ? styles.favorited : ''}`}
                                onClick={() => toggleFavorite(item)}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        <img src={item.image} alt={item.name} className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h1 className={styles.name}>{item.name}</h1>
                            <h3 className={styles.price}>₹{item.price} / Serving</h3>
                            <p className={styles.category}>{item.category}
                                <button 
                                    className={styles.add} 
                                    onClick={() => addToCart(item)}
                                    disabled={addedItems.includes(item.id)}
                                >
                                    {addedItems.includes(item.id) ? 'Added' : 'Add'}
                                </button>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <Footer />
        </div>
        </>
    );
}

export default Menu;
