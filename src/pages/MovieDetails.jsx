import { useParams } from "react-router-dom";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
} from "../services/api";
import { useEffect, useState } from "react";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const [movieData, videoData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
          getMovieCredits(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);

        //Find official trailer from Youtube
        const officialTrailer = videoData.find(
          (vid) =>
            vid.type === "Trailer" &&
            vid.site === "YouTube" &&
            vid.official === true
        );

        //Fallback if no official trailer exists
        if (!officialTrailer && videoData.length > 0) {
          const ytTrailer = videoData.find((vid) => vid.site === "Youtube");
          setTrailer(ytTrailer);
        } else {
          setTrailer(officialTrailer);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load movie details...");
      }
    };

    loadDetails();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  const cast = credits?.cast?.slice(0, 6); // First 6 cast members

  return (
    <div className="movie-details">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="info">
        <h1>
          {movie.title} ({new Date(movie.release_date).getFullYear()})
        </h1>
        <p>
          <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Duration:</strong> {movie.runtime} min
        </p>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <div className="cast">
          {trailer && (
            <div className="trailer-section">
              <h2>Play Trailer</h2>
              <div className="trailer-video">
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          <h2>Cast</h2>
          <ul>
            {cast?.map((actor) => (
              <li key={actor.id}>
                <strong>{actor.name}</strong> as {actor.character}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
