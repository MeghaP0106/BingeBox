// components/ContentCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ContentCard.css';

function ContentCard({ content }) {
  return (
    <div className="content-card">
      <Link to={`/content/${content.Content_ID}`}>
        <div className="thumbnail">
          <img 
            src={content.thumbnail_url || '/default-poster.jpg'} 
            alt={content.Title} 
          />
        </div>
        <div className="content-info">
          <h3>{content.Title}</h3>
          <div className="content-meta">
            <span>{content.Released_year}</span>
            <span className="rating">{content.Rating}/10</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ContentCard;
