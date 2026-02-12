import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import TapeDeck from './TapeDeck.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The Home Page (Gallery) */}
        <Route path="/" element={<App />} />
        
        {/* The Tape Deck Page (Dynamic ID) */}
        <Route path="/tape/:id" element={<TapeDeck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)