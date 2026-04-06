import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css'; 
import './TapeDeck.css'; 

export default function TapeDeck() {
  const { id } = useParams();
  const formattedId = id.toString().padStart(2, '0');
  const imagePath = `/tapes/tape-${formattedId}.webp`;
  
  const [tape, setTape] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [pin, setPin] = useState(['', '', '', '']); 
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tapes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTape(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      
      if (urlObj.pathname.startsWith('/embed')) return url;
      
      // Apple Music Logic
      if (urlObj.hostname.includes('music.apple.com')) {
        return url.replace('music.apple.com', 'embed.music.apple.com');
      }
      
      // Spotify Logic
      if (urlObj.hostname.includes('spotify.com')) {
        const parts = urlObj.pathname.split('/').filter(Boolean); // Clean up the array
        // Example: open.spotify.com/playlist/123ABC -> open.spotify.com/embed/playlist/123ABC
        if (parts[0] !== 'embed') {
            return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}`;
        }
      }
      
      return url; 
    } catch (e) {
      return null;
    }
  }

  // THE HAPTIC TICK (For the PIN pad)
  const triggerTick = () => {
      if (navigator.vibrate) navigator.vibrate(40);
  };

  // THE HAPTIC CLACK (For the heavy Record button)
  const triggerClack = () => {
      if (navigator.vibrate) navigator.vibrate([80, 50, 80]);
  };

  const handlePinChange = (index, value) => {
    if (value.length > 1) return; 
    triggerTick(); // Vibrate on every keystroke
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== '' && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleRecord = async (e) => {
    e.preventDefault();
    setError(null);
    triggerClack(); // Heavy vibration on submit
    
    const pinString = pin.join(''); 

    if (pinString.length !== 4) {
        setError("Please enter all 4 digits of your PIN.");
        return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tapes/${id}/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinString, spotify_url: spotifyUrl })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.detail || 'RECORDING FAILED');
      
      setTape(data.tape);
      setIsEditing(false); 
      setPin(['', '', '', '']); 
      setSpotifyUrl('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="app-container" style={{textAlign: 'center', marginTop: '20%'}}>INITIALIZING...</div>;
  if (!tape) return <div className="app-container">ERROR 404: TAPE NOT FOUND</div>;

  return (
    <div className="app-container">
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

      <div className="tape-deck-wrapper" style={{ marginTop: '80px' }}>
        
        {/* 1. THE HERO ARTWORK WITH SHARPIE OVERLAY */}
        <div className="artwork-container">
          <div className="artwork-relative-wrapper">
             <img 
               src={imagePath} 
               alt={`Tape ${formattedId} Artwork`} 
               className="tape-artwork"
             />
             {tape.is_recorded && !isEditing && (
                 <div className="hero-sharpie-overlay">
                     {tape.song}
                 </div>
             )}
          </div>
          <h1 className="tape-title">
             {isEditing ? "RE-RECORDING" : "THIS IS"} TAPE {formattedId}
          </h1>
        </div>

        {/* 2. THE INTERFACE */}
        <div className="interface-container">
          {error && <div className="error-banner">{error}</div>}

          {(!tape.is_recorded || isEditing) ? (
            <form className="brutalist-form" onSubmit={handleRecord}>
              <div className="form-group">
                <label>4-DIGIT SECURITY PIN</label>
                <div className="pin-pad">
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      id={`pin-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={digit}
                      onChange={(e) => handlePinChange(index, e.target.value)}
                      className="pin-box"
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>PLAYLIST URL (SPOTIFY OR APPLE)</label>
                <input 
                  type="url" 
                  placeholder="PASTE LINK HERE..."
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                  className="url-box"
                  required
                />
              </div>

              <button type="submit" className="action-button record-button">
                RECORD
              </button>
              
              {isEditing && (
                 <button 
                    type="button" 
                    className="action-button cancel-button" 
                    onClick={() => { triggerTick(); setIsEditing(false); }}
                 >
                    CANCEL
                 </button>
              )}
            </form>
          ) : (
            <div className="playback-view">
              <div className="spotify-wrapper">
                <iframe 
                    src={getEmbedUrl(tape.playlist_url)} 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="brutalist-iframe"
                ></iframe>
              </div>
              <button 
                className="action-button eject-button"
                onClick={() => { triggerClack(); setIsEditing(true); }}
              >
                RE-RECORD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}