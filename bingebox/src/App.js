import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ContentDetails from './pages/ContentDetails';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import Watchlist from './pages/Watchlist';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }, []);

  const handleLogin = (userData) => {
    try {
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/content/:id" element={<ContentDetails isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route
              path="/watchlist"
              element={isLoggedIn ? <Watchlist user={user} /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;