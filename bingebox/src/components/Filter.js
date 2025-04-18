
// components/Filter.js
import React, { useState, useEffect } from 'react';
import './Filter.css';

function Filter({ onFilterChange }) {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [studios, setStudios] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [actors, setActors] = useState([]);
  const [years, setYears] = useState([]);
  
  const [selectedFilters, setSelectedFilters] = useState({
    genre: '',
    language: '',
    studio: '',
    platform: '',
    country: '',
    actor: '',
    yearFrom: '',
    yearTo: ''
  });
  
  // Fetch filter options from the backend (to be implemented when connected to SQL)
  useEffect(() => {
    // Fetch genres
    // Example: const response = await fetch('/api/genres');
    // setGenres(response.data);
    
    // Mock data for now
    setGenres(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']);
    setLanguages(['English', 'Spanish', 'French', 'Japanese', 'Korean']);
    setStudios(['Warner Bros', 'Universal', 'Paramount', 'Disney', 'Netflix Studios']);
    setPlatforms(['Netflix', 'Amazon Prime', 'Hulu', 'HBO Max', 'Disney+']);
    setCountries(['USA', 'UK', 'France', 'Japan', 'South Korea', 'India']);
    setActors(['Tom Hanks', 'Meryl Streep', 'Leonardo DiCaprio', 'Jennifer Lawrence']);
    
    // Generate years (from 1950 to current year)
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i);
    setYears(yearsList);
  }, []);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const resetFilters = {
      genre: '',
      language: '',
      studio: '',
      platform: '',
      country: '',
      actor: '',
      yearFrom: '',
      yearTo: ''
    };
    setSelectedFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className="filter">
      <h3>Filters</h3>
      <div className="filter-fields">
        <div className="filter-field">
          <label>Genre:</label>
          <select 
            name="genre" 
            value={selectedFilters.genre} 
            onChange={handleFilterChange}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-field">
          <label>Language:</label>
          <select 
            name="language" 
            value={selectedFilters.language} 
            onChange={handleFilterChange}
          >
            <option value="">All Languages</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-field">
          <label>Studio:</label>
          <select 
            name="studio" 
            value={selectedFilters.studio} 
            onChange={handleFilterChange}
          >
            <option value="">All Studios</option>
            {studios.map(studio => (
              <option key={studio} value={studio}>{studio}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-field">
          <label>Platform:</label>
          <select 
            name="platform" 
            value={selectedFilters.platform} 
            onChange={handleFilterChange}
          >
            <option value="">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-field">
          <label>Country:</label>
          <select 
            name="country" 
            value={selectedFilters.country} 
            onChange={handleFilterChange}
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-field">
          <label>Actor:</label>
          <select 
            name="actor" 
            value={selectedFilters.actor} 
            onChange={handleFilterChange}
          >
            <option value="">All Actors</option>
            {actors.map(actor => (
              <option key={actor} value={actor}>{actor}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-field year-filter">
          <label>Year:</label>
          <div className="year-range">
            <select 
              name="yearFrom" 
              value={selectedFilters.yearFrom} 
              onChange={handleFilterChange}
            >
              <option value="">From</option>
              {years.map(year => (
                <option key={`from-${year}`} value={year}>{year}</option>
              ))}
            </select>
            <span>to</span>
            <select 
              name="yearTo" 
              value={selectedFilters.yearTo} 
              onChange={handleFilterChange}
            >
              <option value="">To</option>
              {years.map(year => (
                <option key={`to-${year}`} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <button onClick={clearFilters} className="clear-filters">Clear Filters</button>
    </div>
  );
}

export default Filter;
