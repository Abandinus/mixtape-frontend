import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 
import './Faq.css'; 

export default function Faq() {
  // Optional: Add the same haptic tick to the back button
  const triggerTick = () => {
    if (navigator.vibrate) navigator.vibrate(40);
  };

  return (
    <div className="app-container">
      {/* STICKY NAV */}
      <nav className="sticky-nav">
        <div className="nav-container">
          <Link to="/">
            <img src="/hf-logo.svg" alt="Logo" className="nav-logo" style={{height: '30px'}} />
          </Link>
          <div className="nav-links">
            <Link to="/" onClick={triggerTick} className="nav-link">← back to collection</Link>
          </div>
        </div>
      </nav>

      {/* FAQ CONTENT */}
      <div className="faq-wrapper" style={{ marginTop: '80px' }}>
        
        <div className="faq-header">
          <h1 className="title-massive" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1', textTransform: 'uppercase' }}>
            THE <br/>MANIFESTO
          </h1>
        </div>

        <div className="faq-grid">
          
          <div className="faq-block">
            <h2 className="faq-question">WHAT IS THIS PROJECT?</h2>
            <div className="faq-answer">
              <p>High Fidelity is an interactive "Phygital" art installation debuting at Comic Con. It consists of 50 hand-carved, hand-pressed linocut prints of cassette tapes.</p>
              <p>Each physical print serves as a unique key to a digital counterpart. Scanning the QR code on your print allows you to "record" over the blank tape, permanently linking your personal soundtrack to the physical artwork.</p>
            </div>
          </div>

          <div className="faq-block">
            <h2 className="faq-question">HOW DO I RECORD A TAPE?</h2>
            <div className="faq-answer">
              <ol>
                <li>Scan the QR code on your physical print.</li>
                <li>Enter the unique 4-digit PIN found on your artwork.</li>
                <li>Paste a link to your favorite Spotify or Apple Music playlist.</li>
                <li>Give your mixtape a name and hit <strong>RECORD</strong>.</li>
              </ol>
            </div>
          </div>

          <div className="faq-block">
            <h2 className="faq-question">CAN I CHANGE MY PLAYLIST LATER?</h2>
            <div className="faq-answer">
              <p>Yes. Just like a real analog cassette, you can put scotch tape over the tabs and record over your old mixes. As long as you hold the physical print and know the PIN, you can re-record your tape at any time.</p>
            </div>
          </div>

          <div className="faq-block">
            <h2 className="faq-question">WHAT ARE THE SEASONS?</h2>
            <div className="faq-answer">
              <p>This batch of 50 tapes is just the beginning. <strong>Season 01</strong> explores the classic cassette deck. Future seasons will explore new mediums, new carving techniques, and new ways to bridge the gap between ink, paper, and digital sound.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}