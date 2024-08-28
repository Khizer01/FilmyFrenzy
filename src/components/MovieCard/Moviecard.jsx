import { useNavigate } from 'react-router-dom';
import './movieCard.css';

export default function Moviecard({ mov }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movDetail/${mov.imdbID}`);
  };

  return (
    <div className="movie" onClick={handleCardClick}>
      <div className="movie-year">{mov.Year}</div>
      <div>
        <img src={mov.Poster !== 'N/A' ? mov.Poster : 'https://via.placeholder.com/400'} alt={mov.Title} />
        <div className="movie-info">
          <h3 className="movie-title">{mov.Title}</h3>
          <span className="movie-category">{mov.Type}</span>
        </div>
      </div>
    </div>
  );
}
