// components/ReviewForm.js
import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ contentId, userId, onReviewSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create review object
    const reviewData = {
      content_id: contentId,
      user_id: userId,
      rating: rating,
      comment: comment,
      timestamp: new Date().toISOString()
    };
    
    // Call parent component's submit handler
    onReviewSubmit(reviewData);
    
    // Reset form
    setRating(5);
    setComment('');
  };
  
  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
          <label>Rating:</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="comment-input">
          <label>Your Review:</label>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Share your thoughts on this title..."
            rows="4"
          ></textarea>
        </div>
        
        <button type="submit" className="submit-review">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;

