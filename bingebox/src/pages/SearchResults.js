// pages/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import Filter from '../components/Filter';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  
  useEffect(() => {
    // Fetch search results from backend
    // Example: const response = await fetch(`/api/search?query=${searchQuery}`);
    
    // Mock data for search results
    setTimeout(() => {
      const mockResults = [
        { Content_ID: 1, Title: 'The Avengers', Released_year: 2012, Rating: 8.0, thumbnail_url: '/mock-images/avengers.jpg', Type: 'Movie', Genres: ['Action', 'Adventure'], Languages: ['English'], Studios: ['Marvel Studios'], Countries: ['USA'], Platforms: ['Disney+'] },
        { Content_ID: 16, Title: 'Avengers: Infinity War', Released_year: 2018, Rating: 8.4, thumbnail_url: '/mock-images/infinity-war.jpg', Type: 'Movie', Genres: ['Action', 'Adventure'], Languages: ['English'], Studios: ['Marvel Studios'], Countries: ['USA'], Platforms: ['Disney+'] },
        { Content_ID: 17, Title: 'Avengers: Endgame', Released_year: 2019, Rating: 8.4, thumbnail_url: '/mock-images/endgame.jpg', Type: 'Movie', Genres: ['Action', 'Adventure'], Languages: ['English'], Studios: ['Marvel Studios'], Countries: ['USA'], Platforms: ['Disney+'] },
        { Content_ID: 18, Title: 'The Avengers: Earth\'s Mightiest Heroes', Released_year: 2010, Rating: 8.3, thumbnail_url: '/mock-images/avengers-cartoon.jpg', Type: 'TV Show', Genres: ['Animation', 'Action'], Languages: ['English'], Studios: ['Marvel Animation'], Countries: ['USA'], Platforms: ['Disney+'] },
        { Content_ID: 19, Title: 'What If...?', Released_year: 2021, Rating: 7.4, thumbnail_url: '/mock-images/what-if.jpg', Type: 'TV Show', Genres: ['Animation', 'Action'], Languages: ['English'], Studios: ['Marvel Studios'], Countries: ['USA'], Platforms: ['Disney+'] },
      ];
      
      setResults(mockResults);
      setFilteredResults(mockResults);
      setLoading(false);
    }, 1000);
  }, [searchQuery]);
  
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    
    // Apply filters to results
    let filtered = [...results];
    
    if (filters.genre) {
      filtered = filtered.filter(item => 
        item.Genres && item.Genres.includes(filters.genre)
      );
    }
    
    if (filters.language) {
      filtered = filtered.filter(item => 
        item.Languages && item.Languages.includes(filters.language)
      );
    }
    
    if (filters.studio) {
      filtered = filtered.filter(item => 
        item.Studios && item.Studios.includes(filters.studio)
      );
    }
    
    if (filters.platform) {
      filtered = filtered.filter(item => 
        item.Platforms && item.Platforms.includes(filters.platform)
      );
    }
    
    if (filters.country) {
      filtered = filtered.filter(item => 
        item.Countries && item.Countries.includes(filters.country)
      );
    }
    
    if (filters.yearFrom) {
      filtered = filtered.filter(item => 
        item.Released_year >= parseInt(filters.yearFrom)
      );
    }
    
    if (filters.yearTo) {
      filtered = filtered.filter(item => 
        item.Released_year <= parseInt(filters.yearTo)
      );
    }
    
    setFilteredResults(filtered);
  };
  
  return (
    <div className="search-results-page">
      <h1>Search Results for "{searchQuery}"</h1>
      
      <div className="search-content">
        <div className="filter-sidebar">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        
        <div className="results-container">
          {loading ? (
            <div className="loading">Loading results...</div>
          ) : filteredResults.length === 0 ? (
            <div className="no-results">
              <p>No results found for "{searchQuery}" with the selected filters.</p>
              <p>Try adjusting your filters or search for something else.</p>
            </div>
          ) : (
            <>
              <div className="results-count">
                {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
              </div>
              <div className="results-grid">
                {filteredResults.map(content => (
                  <ContentCard key={content.Content_ID} content={content} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
