import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMovieContext();
  const favourite = isFavourite(movie.id);

  function SetAsFavorite(e) {
    e.preventDefault();
    if (favourite) removeFromFavourites(movie.id);
    else addToFavourites(movie);
  }

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-button ${favourite ? "active" : ""}`}
            onClick={SetAsFavorite}
          >
            🤍
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
