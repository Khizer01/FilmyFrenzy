import './nav.css';
import SearchIcon from "../../assets/search.svg";
import { useNavigate } from 'react-router-dom';
export default function Nav({ search, setSearch, searchMovie}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <nav>
            <h1 onClick={handleClick}>FilmyFrenzy</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search Here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' ? searchMovie(search) : null}
                />
                <img src={SearchIcon} alt="search" onClick={() => searchMovie(search)} />
            </div>
        </nav>
    )
}
