import React from 'react';
import './GenreFilter.css';
const GenreFilter = ({ genres, selectedGenre, onGenreClick }) => {
  return (
    <div className="genre-filter-container">
      {genres.map((genre) => (
        <button
          key={genre.id}
          // აი ეს ხაზია გადამწყვეტი:
          className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
          onClick={() => onGenreClick(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;