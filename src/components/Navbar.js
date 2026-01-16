import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleTheme, theme, toggleLang, lang, t, searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar">
      {/* მარცხენა მხარე: ლოგო, სერჩი და ლინკები */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">MovieGE</Link>

        <div className="nav-search-wrapper">
          <input 
            type="text" 
            placeholder={lang === 'ka' ? "ძებნა..." : "Search..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="nav-search-input"
          />
        </div>

        <ul className="nav-links">
          <li><Link to="/">{t.home}</Link></li>
          <li><Link to="/favorites">{t.favorites}</Link></li>
        </ul>
      </div>

      {/* მარჯვენა მხარე: ენა და თემა */}
      <div className="nav-right">
        <button onClick={toggleLang} className="lang-btn">{lang.toUpperCase()}</button>
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;