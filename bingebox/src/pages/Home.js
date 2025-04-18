// pages/Home.js
import React, { useState, useEffect } from 'react';
import ContentCard from '../components/ContentCard';
import './Home.css';

function Home() {
  const [trendingContent, setTrendingContent] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topRated, setTopRated] = useState([]);
  
  useEffect(() => {
    // Fetch trending content
    // Example: const response = await fetch('/api/trending');
    // setTrendingContent(response.data);
    // Mock data for now
    setTrendingContent([
      { Content_ID: 1, Title: 'The Avengers', Released_year: 2012, Rating: 8.0, thumbnail_url: 'avengers.jpg' },
      { Content_ID: 2, Title: 'Stranger Things', Released_year: 2016, Rating: 8.7, thumbnail_url: '/mock-images/stranger-things.jpg' },
      { Content_ID: 3, Title: 'The Dark Knight', Released_year: 2008, Rating: 9.0, thumbnail_url: '/mock-images/dark-knight.jpg' },
      { Content_ID: 4, Title: 'Breaking Bad', Released_year: 2008, Rating: 9.5, thumbnail_url: '/mock-images/breaking-bad.jpg' },
      { Content_ID: 5, Title: 'Inception', Released_year: 2010, Rating: 8.8, thumbnail_url: '/mock-images/inception.jpg' },
    ]);
    
    setNewReleases([
      { Content_ID: 6, Title: 'Dune', Released_year: 2021, Rating: 8.1, thumbnail_url: '/mock-images/dune.jpg' },
      { Content_ID: 7, Title: 'Squid Game', Released_year: 2021, Rating: 8.0, thumbnail_url: '/mock-images/squid-game.jpg' },
      { Content_ID: 8, Title: 'No Time to Die', Released_year: 2021, Rating: 7.4, thumbnail_url: '/mock-images/no-time-to-die.jpg' },
      { Content_ID: 9, Title: 'Loki', Released_year: 2021, Rating: 8.3, thumbnail_url: '/mock-images/loki.jpg' },
      { Content_ID: 10, Title: 'The Last of Us', Released_year: 2023, Rating: 8.8, thumbnail_url: '/mock-images/last-of-us.jpg' },
    ]);
    
    setTopRated([
      { Content_ID: 11, Title: 'The Shawshank Redemption', Released_year: 1994, Rating: 9.3, thumbnail_url: '/mock-images/shawshank.jpg' },
      { Content_ID: 12, Title: 'Game of Thrones', Released_year: 2011, Rating: 9.2, thumbnail_url: '/mock-images/got.jpg' },
      { Content_ID: 13, Title: 'The Godfather', Released_year: 1972, Rating: 9.2, thumbnail_url: '/mock-images/godfather.jpg' },
      { Content_ID: 14, Title: 'The Wire', Released_year: 2002, Rating: 9.3, thumbnail_url: '/mock-images/wire.jpg' },
      { Content_ID: 15, Title: 'Pulp Fiction', Released_year: 1994, Rating: 8.9, thumbnail_url: '/mock-images/pulp-fiction.jpg' },
    ]);
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          
        </div>
      </section>
      
      <section className="content-section">
        <h2>Trending Now</h2>
        <div className="content-grid">
          {trendingContent.map(content => (
            <ContentCard key={content.Content_ID} content={content} />
          ))}
        </div>
      </section>
      
      <section className="content-section">
        <h2>New Releases</h2>
        <div className="content-grid">
          {newReleases.map(content => (
            <ContentCard key={content.Content_ID} content={content} />
          ))}
        </div>
      </section>
      
      <section className="content-section">
        <h2>Top Rated</h2>
        <div className="content-grid">
          {topRated.map(content => (
            <ContentCard key={content.Content_ID} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

