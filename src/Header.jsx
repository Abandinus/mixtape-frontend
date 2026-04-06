// Header.jsx
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      {/* 1. The Sticky Bar (This stays at the top) */}
      <nav className="sticky-nav">
        <div className="nav-container">
          <img src="/hf-logo.svg" alt="Logo" className="nav-logo" />
          <div className="nav-links">
            <Link to="/faq" className="nav-link">faq</Link>
          </div>
        </div>
      </nav>

      {/* 2. The Hero Section (This scrolls away) */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="title-massive">lino<br/>tapes</h1>
            <h2 className="subtitle-bold">a seasonal mixtape series</h2>
            <p className="subtitle-desc">
              hand-carved lino prints, each waiting to be recorded
            </p>
          </div>
          <div className="hero-graphic">
             <img src="/recorder.png" alt="Recorder" className="recorder-img" />
          </div>
        </div>
      </header>
    </>
  );
}