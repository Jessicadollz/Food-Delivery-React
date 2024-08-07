import React from 'react';
import styles from './Home.module.css';
import bannerImage from './Banner.jpg'; 
import Reviews from './Reviews';
import Chatbot from '../Chatbot/Chatbot';
// import Footer from '../Footer/Footer'

function Home() {
  return (
    <>
    <Chatbot />
      <div className={styles.containers}>
        <img src={bannerImage} alt="Banner" className={styles.image} />

        <div className={styles.reviews}>
          <h1>Our Customer's Reviews</h1>
          {/* <Reviews /> */}
        </div>
      </div>
      <Reviews />
      {/* <Footer /> */}
    </>
  );
}

export default Home;
