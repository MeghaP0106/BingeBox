// pages/Watchlist.js
import React, { useState, useEffect } from 'react';
import ContentCard from '../components/ContentCard';
import './Watchlist.css';

function Watchlist({ user }) {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch user's watchlist from backend
    // Example: const response = await fetch(`/api/users/${user.User_ID}/watchlist`);
    
    // Mock data for demo
    setTimeout(() => {
      setWatchlist([
        { Content_ID: 1, Title: 'The Avengers', Released_year: 2012, Rating: 8.0, thumbnail_url: '/mock-images/avengers.jpg' },
        { Content_ID: 7, Title: 'Squid Game', Released_year: 2021, Rating: 8.0, thumbnail_url: '/mock-images/squid-game.jpg' },
        { Content_ID: 11, Title: 'The Shawshank Redemption', Released_year: 1994, Rating: 9.3, thumbnail_url: '/mock-images/shawshank.jpg' }
      ]);
      setLoading(false);
    }, 1000);
  }, [user]);
  
  const removeFromWatchlist = (contentId) => {
    // In production: API call to remove from watchlist
    // Example: fetch(`/api/watchlist/remove`, { userId: user.User_ID, contentId })
    
    // Mock remove for demo
    setWatchlist(watchlist.filter(item => item.Content_ID !== contentId));
  };
  
  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <h1>Your Watchlist</h1>
      </div>
      
      {loading ? (
        <div className="loading">Loading your watchlist...</div>
      ) : watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty.</p>
          <p>Start adding movies and TV shows to keep track of what you want to watch!</p>
          <a href="/" className="browse-button">Browse Content</a>
        </div>
      ) : (
        <div className="watchlist-content">
          <div className="watchlist-count">
            {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'} in your watchlist
          </div>
          <div className="watchlist-grid">
            {watchlist.map(content => (
              <div key={content.Content_ID} className="watchlist-item">
                <ContentCard content={content} />
                <button 
                  className="remove-button"
                  onClick={() => removeFromWatchlist(content.Content_ID)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;

