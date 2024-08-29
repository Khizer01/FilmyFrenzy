import { useDispatch, useSelector } from 'react-redux';
import './movieDetail.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setSelectedMovie } from '../../Redux Store/MovieSlice';
import Moviecard from '../MovieCard/Moviecard';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function MovieDetail() {
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const movies = useSelector((state) => state.movie.movies);
  const location = useLocation();
  const movId = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=> {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },[location]);


  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await fetch(`${API_URL}&i=${movId}`);
        const data = await res.json();
        if (data.Response === "True") {
          dispatch(setSelectedMovie(data));
          setIsLoading(false);
        } else {
          console.error('Error fetching movie details');
          setIsLoading(false);
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setIsLoading(false);
        setError(true);
      }
    };

    getMovie();
  }, [dispatch, movId]);

  if (isLoading) return <div className="load"><div className="loader"></div></div>;
  if (error || !selectedMovie) return <div className='empty'><h2>No Movie Found</h2></div>;
  
  return (
      <div className='details-container'>
      <div className='details'>
        <div className="poster">
          <img src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/400'} alt={selectedMovie.Title} />
        </div>
        <div className="movie-info">
          <h2>{selectedMovie.Title}</h2>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Released:</strong> {selectedMovie.Released}</p>
          <p><strong>Type:</strong> {selectedMovie.Type}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
      <div className="additional-info">
        <p><strong>Director:</strong> {selectedMovie.Director}</p>
        <p><strong>Writer:</strong> {selectedMovie.Writer}</p>
        <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
        <p><strong>Box Office:</strong> {selectedMovie.BoxOffice}</p>
        </div>
        </div>
      </div>
      <div className="related-movies">
        {movies
          .filter(movie => movie.imdbID !== movId)
          .map(movie => (
            <Moviecard key={movie.imdbID} mov={movie} />
          ))}
      </div>
    </div>
  );
}

export default MovieDetail;
