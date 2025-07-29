import React, { useState, useEffect } from 'react';
import { logDebug } from './debug';

// Movie Data Json File
interface Movie {
  id: number;
  title: string;
}
// my local Json API location
const API_URL = 'http://localhost:3001/movies';

const MovieDatabase: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');

  // Fetch movies from API on mount 
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to fetch movies:', err));
  }, []);

  // Add a new film
  const handleAddMovie = (): void => {
  logDebug('Trying to add movie:', newTitle);  // Debug

  if (newTitle.trim() === '') {
    logDebug('New title is empty, ignoring add.');
    return;
  }

  const newMovie = { title: newTitle };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMovie),
  })
    .then(res => {
      logDebug('POST response status:', res.status);
      return res.json();
    })
    .then(createdMovie => {
      logDebug('Movie added:', createdMovie);
      setMovies(prev => [...prev, createdMovie]);
      setNewTitle('');
    })
    .catch(err => console.error('Failed to add movie:', err));
};
  // Delete film
  const handleDelete = (id: number): void => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMovies(prev => prev.filter(movie => movie.id !== id));
      })
      .catch(err => console.error('Failed to delete movie:', err));
  };

  return (
    <div className="main-con d-flex">
      <div className="left-section me-4">
        <h2>Movie List</h2>
        <label htmlFor="movie-input">New Movie:</label>
        <input
          type="text"
          id="movie-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Movie title..."
          className="form-control my-2"
        />
        <button className="btn btn-primary" onClick={handleAddMovie}>
          Submit New Movie
        </button>
      </div>

      <div className="right-section">
        <h2>My Movies</h2>
        <div className="item-container">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="item-box d-flex justify-content-between align-items-center mb-2 p-2 border"
            >
              {movie.title}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDatabase;
