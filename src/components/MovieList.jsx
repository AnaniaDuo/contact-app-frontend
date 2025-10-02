import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import API from "../services/api-services";
import { useCookies } from "react-cookie";

function MovieList({ movieClicked, newMovie, updatedMovie }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [token] = useCookies("mr-token");

  useEffect(() => {
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
  }, [updatedMovie]);

  useEffect(() => {
    if (newMovie) {
      const newMovieList = [...movies, newMovie];
      setMovies(newMovieList);
    }
  }, [newMovie]);

  useEffect(() => {
    const fetchMovies = async () => {
      const resp = await API.getMovies(token["mr-token"]);
      if (resp) setMovies(resp);
      else setError("Error fetching movies");
    };
    fetchMovies();
  }, []);

  const removeMovie = async (movie) => {
    const resp = await API.deleteMovie(movie.id, token["mr-token"]);
    if (resp) {
      const newMovieList = [...movies].filter((ele) => ele.id !== movie.id);
      setMovies(newMovieList);
    }
  };

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Movie List</h2>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="grid grid-cols-[0.9fr_auto_auto] p-2 mr-4"
        >
          <h2
            className="cursor-pointer"
            onClick={() => movieClicked(movie, false)}
          >
            {movie.title}
          </h2>
          <FaEdit onClick={() => movieClicked(movie, true)} />
          <MdDeleteOutline onClick={() => removeMovie(movie)} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
