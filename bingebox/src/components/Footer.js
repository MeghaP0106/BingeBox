// components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About BingeBox</h3>
          <p>Your ultimate destination for movie and TV show information.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search?query=new">New Releases</a></li>
            <li><a href="/search?query=top">Top Rated</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p><href>Email: info@BingeBox.com</href></p>
          <p>Phone: +91 97402 48874  (Gouri Naik)</p>
          <p>+91 97314 04133       (Megha Prasad)</p>
          <p>+91 95388 87676     (Mihika Bardhan)</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BingeBox. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

