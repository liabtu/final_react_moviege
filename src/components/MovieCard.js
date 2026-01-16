import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, t }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>⭐ {t.rating}: {movie.vote_average ? movie.vote_average.toFixed(1) : '0'}</p>
        <Link to={`/movie/${movie.id}`} className="details-btn">
          {t.details}
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;