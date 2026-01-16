import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import { translations } from './translations';
import './App.css';

function App() {
  // --- სთეითები (States) ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ka');
  const [searchTerm, setSearchTerm] = useState('');

  // --- ეფექტები (Side Effects) ---
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
    document.body.className = theme; // თემის მინიჭება body-ზე
  }, [theme, lang]);

  // --- დამხმარე ფუნქციები ---
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang(prev => (prev === 'ka' ? 'en' : 'ka'));
  const t = translations[lang];

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Navbar 
          toggleTheme={toggleTheme} 
          theme={theme} 
          toggleLang={toggleLang} 
          lang={lang} 
          t={t} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home t={t} lang={lang} searchTerm={searchTerm} />} />
            <Route path="/movie/:id" element={<Details t={t} lang={lang} />} />
            <Route path="/favorites" element={<Favorites t={t} lang={lang} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;