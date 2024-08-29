import './App.css';
import Nav from './components/Nav/Nav';
import AppRoutes from './components/AppRoutes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearMovie, getMovieFail, getMovieStart, getMovieSuccess } from './Redux Store/MovieSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=> {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },[location]);

    useEffect(() => {
      searchMovie('Superman');
    },[]);
  
    const searchMovie = async (title) => {
      dispatch(clearMovie());
      dispatch(getMovieStart());
      navigate('/');
      try {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        if (data.Response === "True") {
          dispatch(getMovieSuccess(data.Search));
        } else {
          dispatch(getMovieFail());
        }
      } catch (err) {
        dispatch(getMovieFail());
      }
    };
    

  return (
    <div className="app">
      <Nav search={search} setSearch={setSearch} searchMovie={searchMovie} />

      <AppRoutes />
      
      <Footer />
    </div>
  );
}

export default App;
