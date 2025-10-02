import React, { useState, useEffect } from "react";
import API from "../services/api-services";
import { useCookies } from "react-cookie";

function MovieForm({ movie, setUpdatedMovie, setNewMovie }) {
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [token] = useCookies("mr-token");
  const isDisabled = title && description ? false : true;

  useEffect(() => {
    setTitle(movie.title);
    setDescription(movie.description);
  }, [movie]);

  const saveMovie = async () => {
    const response = await API.updateMovie(
      movie.id,
      { title, description },
      token["mr-token"]
    );
    if (response) {
      setUpdatedMovie(response);
    }
  };

  const createMovie = async () => {
    const resp = await API.createMovie(
      { title, description },
      token["mr-token"]
    );
    if (resp) {
      setNewMovie(resp);
    }
  };

  return (
    <React.Fragment>
      {movie && (
        <div className="grid grid-cols-2 gap-2">
          <label htmlFor="title">Title</label>
          <input
            id="description"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
            className="text-gray-700"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
            className="text-gray-700"
          />
          <p>&nbsp;</p>
          {movie.id ? (
            <button onClick={saveMovie} disabled={isDisabled}>
              Update Movie
            </button>
          ) : (
            <button onClick={createMovie} disabled={isDisabled}>
              Add a Movie
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default MovieForm;
