// pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // In a real app, make API call to authenticate user
      // Example: const response = await fetch('/api/login', {...})
      
      // Mock login for demo
      // In production, this would verify credentials with your SQL backend
      setTimeout(() => {
        setIsLoading(false);
        
        // Mock user data - in reality would come from your backend
        const userData = {
          User_ID: 1,
          Name: 'John Doe',
          Email: email
        };
        
        onLogin(userData);
        navigate('/');
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError('Invalid email or password. Please try again.');
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Log in to your account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
