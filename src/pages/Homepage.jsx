import MovieCard from "../components/MovieCard";
import LoadMoreButton from "../components/LoadMoreButton";
import { useState, useEffect, use } from "react";
import { SearchMovies, getPopularMovies } from "../services/api";
import "../css/Homepage.css";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(1);
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load Movies....");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    if (loading) return;

    try {
      const searchResults = await SearchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMoves = async (e) => {
    const nextPage = page + 1;
    try {
      const newMovies = searchQuery
        ? await SearchMovies(searchQuery, nextPage)
        : await getPopularMovies(nextPage);

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => {
          const existingData = new Set(prev.map((movie) => movie.id));
          const filteredNew = newMovies.filter(
            (movie) => !existingData.has(movie.id)
          );
          return [...prev, ...filteredNew];
        });
        setPage(nextPage);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load more movies...");
    }
  };

  return (
    <div className="homepage">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for Movies...."
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
      <div className="load-button-wrapper">
        {hasMore && <LoadMoreButton onClick={loadMoreMoves} />}
      </div>
    </div>
  );
}

export default Homepage;
