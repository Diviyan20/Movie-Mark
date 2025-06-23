import MovieCard from "../components/MovieCard";
import LoadMoreButton from "../components/LoadMoreButton";
import FilterDropdown from "../components/FilterDropdown";
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
  const [filter, setFilter] = useState("popular");

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
      try {
        setLoading(true);
        if (!searchQuery.trim()) {
          let fetchedMovies = [];

          if (filter === "popular") {
            fetchedMovies = await getPopularMovies(1);
          } else if (filter === "latest") {
            fetchedMovies = await getPopularMovies(1);
            fetchedMovies.sort(
              (a, b) => new Date(b.release_date) - new Date(a.release_date)
            );
          } else if (filter == "a-z") {
            fetchedMovies = await getPopularMovies(1);
            fetchedMovies.sort((a, b) => a.title.localeCompare(b.title));
          }

          setMovies(fetchedMovies);
          setSearchSuggestion([]);
          setPage(1);
          setHasMore(true);
          setShowSuggestions(false);
          return;
        }

        const searchResults = await SearchMovies(searchQuery, 1);

        if (filter === "latest") {
          searchResults.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          );
        } else if (filter === "a-z") {
          searchResults.sort((a, b) => a.title.localeCompare(b.title));
        }
        setSearchSuggestion(searchResults.slice(0, 5));
        setShowSuggestions(true);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to search movies..");
        setSearchSuggestion([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    }, 400); //Debounce delay in ms

    return () => clearTimeout(debounceDelay);
  }, [searchQuery, filter]);

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
        />
        <button type="submit" className="search-button">
          Search
        </button>

        <FilterDropdown filter={filter} setFilter={setFilter} />
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
