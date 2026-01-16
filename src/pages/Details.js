import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal'; // შემოგვაქ მოდალი
import './Details.css';

const Details = ({ t, lang }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // მოდალის კონტროლი
  const API_KEY = 'bef98b8d9a1c948a665bfaaf8a447551';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiLang = lang === 'ka' ? 'ka-GE' : 'en-US';
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${apiLang}`);
        
        if (lang === 'ka' && !res.data.overview) {
          const engRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
          setMovie(engRes.data);
        } else {
          setMovie(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id, lang]);

  const addToFavorites = () => {
    const favs = JSON.parse(localStorage.getItem('favMovies')) || [];
    if (!favs.find(m => m.id === movie.id)) {
      favs.push(movie);
      localStorage.setItem('favMovies', JSON.stringify(favs));
      setIsModalOpen(true); // alert-ის ნაცვლად ვხსნით მოდალს
    }
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="details-container" style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), 
      url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    }}>
      <div className="details-content">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="details-text">
          <h1>{movie.title}</h1>
          <p className="overview">{movie.overview}</p>
          <div className="meta-info">
            <p>📅 {t.release_date}: {movie.release_date}</p>
            <p>⭐ {t.rating}: {movie.vote_average ? movie.vote_average.toFixed(1) : '0'}</p>
          </div>
          <button onClick={addToFavorites} className="fav-btn">{t.add_fav}</button>
        </div>
      </div>

      {/* წარმატებით დამატების მოდალი */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>✅</div>
          <h2>{lang === 'ka' ? 'წარმატება!' : 'Success!'}</h2>
          <p>
            {lang === 'ka' 
              ? `"${movie.title}" დაემატა ფავორიტებში.` 
              : `"${movie.title}" has been added to favorites.`}
          </p>
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="details-btn" 
            style={{ marginTop: '20px', width: 'auto', padding: '10px 30px' }}
          >
            {lang === 'ka' ? 'კარგი' : 'OK'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Details;