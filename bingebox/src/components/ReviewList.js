// components/ReviewList.js
import React from 'react';
import './ReviewList.css';

function ReviewList({ reviews }) {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="review-list">
      <h3>User Reviews</h3>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-user">{review.username}</div>
              <div className="review-rating">{review.rating}/10</div>
            </div>
            <div className="review-date">{formatDate(review.timestamp)}</div>
            <div className="review-comment">{review.comment}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;

