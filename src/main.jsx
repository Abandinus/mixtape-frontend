import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import TapeDeck from './TapeDeck.jsx'
import './index.css'
import Faq from './Faq.jsx'

// --- THE JEDI MIND TRICK (QR CODE REDIRECT) ---
// If someone scans a physical QR code pointing to the Render URL,
// this instantly bounces them to your custom domain while keeping the correct tape ID.
if (window.location.hostname.includes("onrender.com")) {
  window.location.replace("https://linotapes.co.za" + window.location.pathname);
}
// ----------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The Home Page (Gallery) */}
        <Route path="/" element={<App />} />
        
        {/* The Tape Deck Page (Dynamic ID) */}
        <Route path="/tape/:id" element={<TapeDeck />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)