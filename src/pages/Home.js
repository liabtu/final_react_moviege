import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';
import Pagination from '../components/Pagination';
import './Home.css';

const Home = ({ t, lang, searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = 'bef98b8d9a1c948a665bfaaf8a447551';

  const genres = [
    { id: null, name: lang === 'ka' ? 'ყველა' : 'All' },
    { id: 28, name: lang === 'ka' ? 'მძაფრსიუჟეტიანი' : 'Action' },
    { id: 18, name: lang === 'ka' ? 'დრამა' : 'Drama' },
    { id: 53, name: lang === 'ka' ? 'თრილერი' : 'Thriller' },
    { id: 35, name: lang === 'ka' ? 'კომედია' : 'Comedy' },
    { id: 27, name: lang === 'ka' ? 'საშინელება' : 'Horror' },
    { id: 16, name: lang === 'ka' ? 'ანიმაცია' : 'Animation' }
  ];

  useEffect(() => { setCurrentPage(1); }, [selectedGenre, searchTerm]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiLang = lang === 'ka' ? 'ka-GE' : 'en-US';
      const genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : '';
      
      try {
        let mainUrl = searchTerm 
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=${apiLang}&page=${currentPage}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${apiLang}&sort_by=popularity.desc${genreParam}&page=${currentPage}`;

        const resMain = await axios.get(mainUrl);
        setMovies(resMain.data.results);
        setTotalPages(Math.min(resMain.data.total_pages, 500));

        if (!searchTerm && !selectedGenre && currentPage === 1 && resMain.data.results.length > 0) {
          setHeroMovie(resMain.data.results[0]);
        }

        if (!searchTerm && currentPage === 1) {
          const resTop = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${apiLang}&sort_by=vote_average.desc&vote_count.gte=500${genreParam}`);
          setTopRated(resTop.data.results.slice(0, 10));
        }
      } catch (error) { console.error(error); }
    };
    fetchMovies();
    window.scrollTo(0, 0);
  }, [searchTerm, lang, selectedGenre, currentPage]);

  return (
    <div className="home-page">
      {heroMovie && !searchTerm && !selectedGenre && currentPage === 1 && (
        <div className="hero-banner" style={{ backgroundImage: `linear-gradient(to top, #141414 10%, rgba(0,0,0,0) 70%), url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})` }}>
          <div className="hero-info">
            <h1>{heroMovie.title}</h1>
            <Link to={`/movie/${heroMovie.id}`} className="hero-play-btn">▶ {t.details}</Link>
          </div>
        </div>
      )}

      <div className="home-container">
        {!searchTerm && <GenreFilter genres={genres} selectedGenre={selectedGenre} onGenreClick={setSelectedGenre} />}

        <h2 className="section-title">
          {searchTerm ? t.search_results : (selectedGenre ? genres.find(g => g.id === selectedGenre).name : t.popular)}
        </h2>
        
        <div className="movie-grid">
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} t={t} />)}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} t={t} />

        {!searchTerm && currentPage === 1 && topRated.length > 0 && (
          <>
            <h2 className="section-title" style={{ marginTop: '50px' }}>{lang === 'ka' ? "უმაღლესი რეიტინგი" : "Top Rated Movies"}</h2>
            <div className="movie-grid">{topRated.map(movie => <MovieCard key={movie.id} movie={movie} t={t} />)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;