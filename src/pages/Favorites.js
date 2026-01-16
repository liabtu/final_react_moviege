import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Modal from '../components/Modal'; 
import './Favorites.css';

const Favorites = ({ t, lang }) => {
  const [favs, setFavs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // მოდალის მდგომარეობა
  const [selectedMovieId, setSelectedMovieId] = useState(null); // რომელი ფილმის წაშლა გვინდა

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favMovies')) || [];
    setFavs(saved);
  }, []);

  // მოდალის გახსნის ფუნქცია
  const openDeleteModal = (id) => {
    setSelectedMovieId(id);
    setIsModalOpen(true);
  };

  // წაშლის დადასტურება
  const confirmDelete = () => {
    const updatedFavs = favs.filter(m => m.id !== selectedMovieId);
    setFavs(updatedFavs);
    localStorage.setItem('favMovies', JSON.stringify(updatedFavs));
    setIsModalOpen(false);
  };

  return (
    <div className="favorites-container">
      <h2 className="section-title">{t.favorites}</h2>
      
      {favs.length === 0 ? (
        <p className="no-favs-msg">{t.no_favs}</p>
      ) : (
        <div className="movie-grid">
          {favs.map(movie => (
            <div key={movie.id} className="fav-card-wrapper">
              <MovieCard movie={movie} t={t} />
              <button 
                onClick={() => openDeleteModal(movie.id)} 
                className="remove-btn"
              >
                {lang === 'ka' ? 'წაშლა' : 'Remove'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* მოდალური ფანჯარა */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>{lang === 'ka' ? 'დადასტურება' : 'Confirmation'}</h3>
        <p>{lang === 'ka' ? 'ნამდვილად გსურთ წაშლა?' : 'Are you sure you want to delete?'}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={confirmDelete} className="details-btn">
            {lang === 'ka' ? 'დიახ' : 'Yes'}
          </button>
          <button onClick={() => setIsModalOpen(false)} className="lang-btn">
            {lang === 'ka' ? 'არა' : 'No'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Favorites;