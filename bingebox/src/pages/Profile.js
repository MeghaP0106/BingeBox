// pages/Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch user's reviews from backend
    // Example: const response = await fetch(`/api/users/${user.User_ID}/reviews`);
    
    // Mock data for demo
    setTimeout(() => {
      setReviews([
        { 
          id: 1, 
          content_id: 1, 
          content_title: 'The Avengers', 
          rating: 9, 
          comment: 'This movie changed superhero films forever!', 
          timestamp: '2022-04-15T18:30:00' 
        },
        { 
          id: 2, 
          content_id: 12, 
          content_title: 'Game of Thrones', 
          rating: 8, 
          comment: 'Great series, but the ending was disappointing.', 
          timestamp: '2022-03-10T14:45:00' 
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [user]);
  
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
    <div className="profile-page">
      <div className="profile-header">
        <h1>Your Profile</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-info">
          <h2>Account Information</h2>
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{user.Name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.Email}</span>
          </div>
        </div>
        
        <div className="profile-reviews">
          <h2>Your Reviews</h2>
          
          {loading ? (
            <div className="loading">Loading your reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="no-reviews">
              <p>You haven't written any reviews yet.</p>
              <p>Start exploring content and share your thoughts!</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <a href={`/content/${review.content_id}`} className="review-title">
                      {review.content_title}
                    </a>
                    <div className="review-rating">{review.rating}/10</div>
                  </div>
                  <div className="review-date">{formatDate(review.timestamp)}</div>
                  <div className="review-comment">{review.comment}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

