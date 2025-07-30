import React, { useEffect, useState } from 'react';
import './NewMovie.css'; 

const MOVIE_API_KEY = '9bb81309'; // Your OMDb API key

const curatedKeywords = [
  'star', 'love', 'war', 'dark', 'life', 'ghost', 'night', 'hero',
  'vortex', 'sanctuary', 'clash', 'ascend', 'fate', 'relic', 'spire', 'echoes'
];

// Shuffle array using Fisher-Yates
const shuffleArray = (array: string[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

type MovieData = {
  Title: string;
  Poster: string;
  imdbID: string;
};

const NewMovie: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRandomMovie = async (): Promise<MovieData | null> => {
    const maxRetries = 5;
    const shuffledKeywords = shuffleArray(curatedKeywords);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const randomSearch = shuffledKeywords[attempt % shuffledKeywords.length];
      const randomPage = Math.floor(Math.random() * 3) + 1;

      try {
        const searchRes = await fetch(
          `https://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&type=movie&s=${randomSearch}&page=${randomPage}`
        );
        const searchData = await searchRes.json();

        if (searchData.Response === 'True' && searchData.Search.length > 0) {
          const randomMovie = searchData.Search[Math.floor(Math.random() * searchData.Search.length)];

          const fullRes = await fetch(
            `https://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&i=${randomMovie.imdbID}&plot=short`
          );
          const fullData = await fullRes.json();

          if (fullData && fullData.Poster && fullData.Poster !== 'N/A') {
            return fullData;
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }

    return null;
  };

  const fetchValidMovies = async (count: number): Promise<MovieData[]> => {
    const fetched: MovieData[] = [];
    const usedIds = new Set<string>();

    while (fetched.length < count) {
      const movie = await fetchRandomMovie();
      if (movie && !usedIds.has(movie.imdbID)) {
        fetched.push(movie);
        usedIds.add(movie.imdbID);
      }
    }

    return fetched;
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const results = await fetchValidMovies(5);
      setMovies(results);
      setLoading(false);
    };

    loadMovies();
  }, []);

  const renderMovieBox = (movie: MovieData, className: string) => (
    <div className={className} key={movie.imdbID}>
      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{
          height: '100%',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );

  return (
    <div className="right-section">
      <h2>New Movies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-container-row">
          {movies.map((movie, index) =>
            renderMovieBox(
              movie,
              `movie-generator-container-${String.fromCharCode(65 + index)}`
            )
          )}
        </div>
      )}
    </div>
  );
};

export default NewMovie;
