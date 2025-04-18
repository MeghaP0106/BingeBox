// pages/ContentDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import './ContentDetails.css';

function ContentDetails({ isLoggedIn, user }) {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch content details from backend
    // Example: const response = await fetch(`/api/content/${id}`);
    
    // Mock data for demo
    setTimeout(() => {
      if (id === '1') {
        setContent({
          Content_ID: 1,
          Title: 'The Avengers',
          Produced_year: 2012,
          Released_year: 2012,
          Director: 'Joss Whedon',
          Description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
          Rating: 8.0,
          thumbnail_url: 'avengers.jpg',
          Type: 'Movie',
          Duration: '143 min',
          Studio: 'Marvel Studios',
          Genres: ['Action', 'Adventure', 'Sci-Fi'],
          Languages: ['English'],
          Countries: ['USA'],
          Platforms: ['Disney+', 'Amazon Prime']
        });
        
        setCast([
          { Actor_ID: 1, Name: 'Robert Downey Jr.', Character: 'Tony Stark / Iron Man' },
          { Actor_ID: 2, Name: 'Chris Evans', Character: 'Steve Rogers / Captain America' },
          { Actor_ID: 3, Name: 'Scarlett Johansson', Character: 'Natasha Romanoff / Black Widow' },
          { Actor_ID: 4, Name: 'Mark Ruffalo', Character: 'Bruce Banner / Hulk' },
          { Actor_ID: 5, Name: 'Chris Hemsworth', Character: 'Thor' }
        ]);
        
        setReviews([
          { id: 1, user_id: 2, username: 'MovieFan42', rating: 9, comment: 'This movie changed superhero films forever!', timestamp: '2022-04-15T18:30:00' },
          { id: 2, user_id: 3, username: 'CriticGuy', rating: 7, comment: 'Good action but plot holes were distracting.', timestamp: '2022-05-20T10:15:00' }
        ]);
      } else {
        // Default content for any other ID
        setContent({
          Content_ID: parseInt(id),
          Title: `Sample Movie ${id}`,
          Produced_year: 2020,
          Released_year: 2020,
          Director: 'Sample Director',
          Description: 'This is a sample movie description.',
          Rating: 7.5,
          thumbnail_url: '/mock-images/sample.jpg',
          Type: 'Movie',
          Duration: '120 min',
          Studio: 'Sample Studios',
          Genres: ['Drama'],
          Languages: ['English'],
          Countries: ['USA'],
          Platforms: ['Netflix']
        });
        
        setCast([
          { Actor_ID: 1, Name: 'Actor One', Character: 'Character One' },
          { Actor_ID: 2, Name: 'Actor Two', Character: 'Character Two' }
        ]);
        
        setReviews([]);
      }
      
      setLoading(false);
      
      // Check if in watchlist (if user is logged in)
      if (isLoggedIn && user) {
        // Example: fetch('/api/watchlist/check', { userId: user.User_ID, contentId: id })
        // Mock check
        setIsInWatchlist(id === '1'); // Pretend only id 1 is in watchlist
      }
    }, 1000);
  }, [id, isLoggedIn, user]);
  
  const handleWatchlistToggle = () => {
    if (!isLoggedIn) return;
    
    // Toggle watchlist status
    // In production: API call to add or remove from watchlist
    // Example: fetch('/api/watchlist/toggle', { userId: user.User_ID, contentId: id })
    
    // Mock toggle for demo
    setIsInWatchlist(!isInWatchlist);
  };
  
  const handleReviewSubmit = (reviewData) => {
    // In production: API call to submit review
    // Example: fetch('/api/reviews/add', { method: 'POST', body: JSON.stringify(reviewData) })
    
    // Mock submit for demo
    const newReview = {
      id: reviews.length + 1,
      user_id: user.User_ID,
      username: user.Name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      timestamp: reviewData.timestamp
    };
    
    setReviews([newReview, ...reviews]);
  };
  
  if (loading) {
    return <div className="loading">Loading content details...</div>;
  }
  
  if (!content) {
    return <div className="not-found">Content not found</div>;
  }
  
  return (
    <div className="content-details">
      <div className="content-header">
        <div className="content-poster">
          <img src={content.thumbnail_url || '/default-poster.jpg'} alt={content.Title} />
        </div>
        
        <div className="content-info">
          <h1>{content.Title}</h1>
          
          <div className="content-meta">
            <span>{content.Released_year}</span>
            <span>{content.Type === 'Movie' ? content.Duration : `${content.Seasons} Seasons`}</span>
            <span className="rating">{content.Rating}/10</span>
          </div>
          
          <div className="content-genres">
            {content.Genres && content.Genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
          
          <p className="content-description">{content.Description}</p>
          
          <div className="content-details-row">
            <span className="detail-label">Director:</span>
            <span className="detail-value">{content.Director}</span>
          </div>
          
          <div className="content-details-row">
            <span className="detail-label">Studio:</span>
            <span className="detail-value">{content.Studio}</span>
          </div>
          
          <div className="content-details-row">
            <span className="detail-label">Languages:</span>
            <span className="detail-value">{content.Languages && content.Languages.join(', ')}</span>
          </div>
          
          <div className="content-details-row">
            <span className="detail-label">Countries:</span>
            <span className="detail-value">{content.Countries && content.Countries.join(', ')}</span>
          </div>
          
          <div className="content-details-row">
            <span className="detail-label">Available on:</span>
            <div className="platform-list">
              {content.Platforms && content.Platforms.map((platform, index) => (
                <span key={index} className="platform-tag">{platform}</span>
              ))}
            </div>
          </div>
          
          {isLoggedIn && (
            <button 
              className={`watchlist-button ${isInWatchlist ? 'in-watchlist' : ''}`}
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          )}
        </div>
      </div>
      
      <div className="content-cast">
        <h2>Cast</h2>
        <div className="cast-list">
          {cast.map(actor => (
            <div key={actor.Actor_ID} className="cast-member">
              <div className="actor-photo">
                <img src={`/mock-images/actors/${actor.Actor_ID}.jpg`} alt={actor.Name} />
              </div>
              <div className="actor-info">
                <div className="actor-name">{actor.Name}</div>
                <div className="actor-character">{actor.Character}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="content-reviews">
        <h2>Reviews</h2>
        {isLoggedIn ? (
          <ReviewForm 
            contentId={content.Content_ID} 
            userId={user.User_ID} 
            onReviewSubmit={handleReviewSubmit} 
          />
        ) : (
          <div className="login-prompt">
            <p>Please <a href="/login">log in</a> to write a review.</p>
          </div>
        )}
        
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}

export default ContentDetails;

