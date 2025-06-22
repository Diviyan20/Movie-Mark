import MovieCard from "../components/MovieCard";
import LoadMoreButton from "../components/LoadMoreButton";
import { useState, useEffect, use } from "react";
import { SearchMovies, getPopularMovies } from "../services/api";
import "../css/Homepage.css";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //Load popular movies initially
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

  useEffect(() => {
    const debounceDelay = setTimeout(async () => {
      if (!searchQuery.trim()) {
        const popularMovies = await getPopularMovies(1);
        setMovies(popularMovies);
        setSearchSuggestion([]);
        setPage(1);
        setHasMore(true);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await SearchMovies(searchQuery, 1);
        setSearchSuggestion(searchResults.slice(0, 5)); //Shows only top 5
        setShowSuggestions(true);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to search movies");
        setSearchSuggestion([]);
        setShowSuggestions(false);
      }
    }, 400); //Debounce delay in ms

    return () => clearTimeout(debounceDelay);
  }, [searchQuery]);

  const handleSuggestionClick = async (movie) => {
    try {
      setSearchQuery(movie.title);
      setShowSuggestions(false);
      setSearchSuggestion([]);
      setLoading(true);

      const searchResults = await SearchMovies(movie.title, 1);
      setMovies(searchResults);
      setPage(1);
      setHasMore(true);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to Search Movie....");
    } finally {
      setLoading(false);
    }
  };

  //Load More movies by clicking Load More Button
  const loadMoreMovies = async (e) => {
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for Movies...."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} //Delay for click to register
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {showSuggestions && searchSuggestion.length > 0 && (
          <ul className="suggestions-dropdown">
            {searchSuggestion.map((movie) => (
              <li
                key={movie.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(movie)}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>

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
        {hasMore && !loading && <LoadMoreButton onClick={loadMoreMovies} />}
      </div>
    </div>
  );
}

export default Homepage;
