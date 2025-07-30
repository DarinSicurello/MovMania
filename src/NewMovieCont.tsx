import React, { useState } from 'react';
import './MovieGenerator.css';

const MOVIE_API_KEY = '9bb81309'; // Your OMDb API key UPDATED from separate JS file

// Simple "Fisher-Yates" shuffle to randomize the keyword list
const shuffleArray = (array: string[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/***** Movie Generator Component *****/
export default function MovieGenerator() {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const curatedKeywords = [ /* ... your full keyword list remains unchanged ... */ 
    'star', 'love', 'war', 'dark', 'life', 'ghost', 'night', 'hero',
    // ... [truncated for brevity] ...
    'vortex', 'sanctuary', 'clash', 'ascend', 'fate', 'relic', 'spire', 'echoes'
  ];

  const fetchMovie = async () => {
    const maxRetries = 5;
    const shuffledKeywords = shuffleArray(curatedKeywords);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const randomSearch = shuffledKeywords[attempt % shuffledKeywords.length];
      const randomPage = Math.floor(Math.random() * 3) + 1;

      console.log(`🔍 Attempt ${attempt + 1}: Searching OMDb with s=${randomSearch}&page=${randomPage}`);

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
          return fullData;
        } else {
          console.warn(`No movies found or error for: ${randomSearch} - ${searchData.Error || ''}`);
        }
      } catch (error) {
        console.error(`Error fetching...:`, error);
      }
    }

    console.error('Max retries reached... no movie found.');
    return null;
  };
    const onFetchMovieLoad = async () => {
    setLoading(true);
    const data = await fetchMovie();
    setMovie(data);
    setLoading(false);
  };

  return (
      <div className="mt-4 p-3 border rounded bg-light" id="movie-container">
      <img className="img-thumbnail mb-2" src={posterSrc} alt={movie.Title}>
      </div>
        </div>
    </div>
    );
  };
