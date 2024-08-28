import React from "react";
import Moviecard from "../../components/MovieCard/Moviecard";
import { useSelector } from "react-redux";

export default function Home() {
  const {movies, loading, error} = useSelector(state => state.movie);
   
  return (
    <div>
      {loading && !error && <div className="load"><div className="loader"></div></div>}

      {error && !loading && (
        <div className="empty">
          <h2>No Movie Found</h2>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <Moviecard key={movie.imdbID} mov={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
