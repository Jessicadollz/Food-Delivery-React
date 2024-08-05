// import React, { useState, useEffect } from 'react';
// import styles from './Reviews.module.css';

// const initialReviews = [
//   { id: 1, name: "John Doe", review: "Amazing service and delicious food! Highly recommend.", rating: 5 },
//   { id: 2, name: "Jane Smith", review: "Great ambiance and friendly staff. Will visit again.", rating: 4 },
//   { id: 3, name: "Michael Johnson", review: "The food was okay, but the service could be improved.", rating: 3 },
//   { id: 4, name: "Emily Davis", review: "Fantastic experience overall. The dessert was the highlight!", rating: 5 },
//   { id: 5, name: "Chris Lee", review: "Good food, but a bit pricey for the portion sizes.", rating: 4 },
//   { id: 6, name: "Sara Wilson", review: "Not impressed with the cleanliness of the restaurant.", rating: 2 },
//   { id: 7, name: "David Brown", review: "The staff was attentive, and the food was served promptly.", rating: 4 },
//   { id: 8, name: "Anna Clark", review: "The experience was mediocre. Expected better based on reviews.", rating: 3 },
//   { id: 9, name: "Tom Harris", review: "Excellent value for money. The portions were generous.", rating: 5 },
//   { id: 10, name: "Sophia Miller", review: "Average experience. The food was fine but nothing extraordinary.", rating: 3 },
// ];

// function Reviews() {
//   const [reviews, setReviews] = useState(() => {
//     // Initialize state with reviews from local storage or default to initialReviews
//     const savedReviews = localStorage.getItem('reviews');
//     return savedReviews ? JSON.parse(savedReviews) : initialReviews;
//   });

//   const [name, setName] = useState('');
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(5); // Default rating to 5

//   useEffect(() => {
//     // Save reviews to local storage whenever reviews state changes
//     localStorage.setItem('reviews', JSON.stringify(reviews));
//   }, [reviews]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name && reviewText) {
//       const newReview = {
//         id: reviews.length ? reviews[reviews.length - 1].id + 1 : 1,
//         name,
//         review: reviewText,
//         rating: parseInt(rating, 10),
//       };
//       const updatedReviews = [...reviews, newReview];
//       setReviews(updatedReviews);
//       setName('');
//       setReviewText('');
//       setRating(5); // Reset rating to default value
//     }
//   };

//   return (
//     <div className={styles.reviewContainer}>
//       <div className={styles.reviewList}>
//         {reviews.map(review => (
//           <div key={review.id} className={styles.reviewCard}>
//             <h2 className={styles.reviewName}>{review.name}</h2>
//             <p className={styles.reviewText}>{review.review}</p>
//             <p className={styles.reviewRating}>Rating: {review.rating} ★</p>
//           </div>
//         ))}
//       </div>

//       <div className={styles.reviewForm}>
//         <h3>Add Your Review</h3>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="review">Review:</label>
//             <textarea
//               id="review"
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="rating">Rating:</label>
//             <select
//               id="rating"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//             >
//               <option value={5}>5</option>
//               <option value={4}>4</option>
//               <option value={3}>3</option>
//               <option value={2}>2</option>
//               <option value={1}>1</option>
//             </select>
//           </div>
//           <button type="submit">Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Reviews;





import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';

const initialReviews = [
  { id: 1, name: "John Doe", review: "Amazing service and delicious food! Highly recommend.", rating: 5, userAdded: false },
  { id: 2, name: "Jane Smith", review: "Great ambiance and friendly staff. Will visit again.", rating: 4, userAdded: false },
  { id: 3, name: "Michael Johnson", review: "The food was okay, but the service could be improved.", rating: 3, userAdded: false },
  { id: 4, name: "Emily Davis", review: "Fantastic experience overall. The dessert was the highlight!", rating: 5, userAdded: false },
  { id: 5, name: "Chris Lee", review: "Good food, but a bit pricey for the portion sizes.", rating: 4, userAdded: false },
  { id: 6, name: "Sara Wilson", review: "Not impressed with the cleanliness of the restaurant.", rating: 2, userAdded: false },
  { id: 7, name: "David Brown", review: "The staff was attentive, and the food was served promptly.", rating: 4, userAdded: false },
  { id: 8, name: "Anna Clark", review: "The experience was mediocre. Expected better based on reviews.", rating: 3, userAdded: false },
  { id: 9, name: "Tom Harris", review: "Excellent value for money. The portions were generous.", rating: 5, userAdded: false },
  { id: 10, name: "Sophia Miller", review: "Average experience. The food was fine but nothing extraordinary.", rating: 3, userAdded: false },
];

function Reviews() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : initialReviews;
  });

  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && reviewText) {
      const newReview = {
        id: reviews.length ? reviews[reviews.length - 1].id + 1 : 1,
        name,
        review: reviewText,
        rating: parseInt(rating, 10),
        userAdded: true,
      };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setName('');
      setReviewText('');
      setRating(5);
    }
  };

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewList}>
        {reviews.map(review => (
          <div key={review.id} className={styles.reviewCard}>
            <h2 className={styles.reviewName}>{review.name}</h2>
            <p className={styles.reviewText}>{review.review}</p>
            <p className={styles.reviewRating}>Rating: {review.rating} ★</p>
            {review.userAdded && (
              <button className={styles.deleteButton} onClick={() => handleDelete(review.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.reviewForm}>
        <h3>Add Your Review</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
