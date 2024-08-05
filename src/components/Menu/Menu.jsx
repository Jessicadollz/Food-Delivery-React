import React, { useState } from 'react';
import styles from '../Menu/Menu.module.css';
import menuData from '../Data/Data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import Cart from '../Cart/Cart.jsx';

function Menu({cart, setCart}) {
    const [favorites, setFavorites] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState(null);
    // const [cart, setCart] = useState([]);


    const toggleFavorite = (id) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [id]: !prevFavorites[id]
        }));
    };

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption ? selectedOption.value : null);
    };

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
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
        <div className={styles.menu}>
            <h1 style={{ textAlign: "center", fontSize: "4rem", marginTop: "5rem" }}>Menu</h1>
            <div className={styles.search}>
                <div className={styles.selCat}>
                {/* <label htmlFor="categorySelect">Search: </label> */}
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
                {/* <label htmlFor="sortSelect">Sort: </label> */}
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
                                className={`${styles.heart} ${favorites[item.id] ? styles.favorited : ''}`} 
                                onClick={() => toggleFavorite(item.id)}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        <img src={item.image} alt={item.name} className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h1 className={styles.name}>{item.name}</h1>
                            <h3 className={styles.price}>₹{item.price} / Serving</h3>
                            <p className={styles.category}>{item.category}
                        
                            {/* <button className={styles.add}>Add</button> */}
                            <button className={styles.add} onClick={() => addToCart(item)}>Add</button>

                            </p>
                        </div>
        
                    </div>
                ))}
            </div>
            
            {/* <Cart cartItems={cart} removeFromCart={removeFromCart} /> */}
        </div>
    );
}

export default Menu;