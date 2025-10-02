import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import API from "../services/api-services";
import { useCookies } from "react-cookie";

function MovieDetails({ selectedMovie, setSelectedMovie, setUpdatedMovie }) {
  const [highlighted, setHighlighted] = useState(-1);
  const [error, setError] = useState(null);
  const [token] = useCookies("mr-token");

  const rateMovie = async (rate) => {
    const rateMovieFunc = async () => {
      const resp = await API.rateMovie(
        selectedMovie.id,
        { stars: rate },
        token["mr-token"]
      );
      if (resp) {
        getNewMovie();
        setError("Successfully rating movie");
      } else setError("Error rating movie");
    };
    rateMovieFunc();
  };

  const getNewMovie = async () => {
    const fetchNewMovie = async () => {
      const resp = await API.getNewMovie(selectedMovie.id, token["mr-token"]);
      if (resp) {
        setSelectedMovie(resp);
        setUpdatedMovie(resp);
      }
    };
    fetchNewMovie();
  };

  useEffect(() => {
    console.log("selected movie has changed", selectedMovie);
    console.log("what is error ", error);
  }, [selectedMovie, error]);

  return (
    <React.Fragment>
      {selectedMovie && (
        <div>
          <div className="text-xl font-bold mb-2">Movie Details</div>
          <h1>
            <span className="font-bold mr-2">Title: </span>
            {selectedMovie?.title}
          </h1>
          <p>
            <span className="font-bold mr-2">Description: </span>
            {selectedMovie?.description}
          </p>
          <div className="flex items-center">
            <div className="font-bold mr-2">Rating:</div>
            <div className="flex items-center">
              <FaStar
                className={selectedMovie?.avg_rating > 0 && "text-orange-400"}
              />
              <FaStar
                className={selectedMovie?.avg_rating > 1 && "text-orange-400"}
              />
              <FaStar
                className={selectedMovie?.avg_rating > 2 && "text-orange-400"}
              />
              <FaStar
                className={selectedMovie?.avg_rating > 3 && "text-orange-400"}
              />
              <FaStar
                className={selectedMovie?.avg_rating > 4 && "text-orange-400"}
              />
              <p className="ml-2">({selectedMovie?.no_of_ratings})</p>
            </div>
          </div>
          <h1 className="border-t-2 border-orange-200 pt-4 mt-4 text-xl font-bold mb-4">
            Rate the Movie
          </h1>
          <div className="flex items-center text-2xl">
            {[...Array(5)].map((el, idx) => {
              return (
                <FaStar
                  key={idx}
                  className={highlighted > idx && "text-orange-400"}
                  onMouseEnter={() => setHighlighted(idx + 1)}
                  onMouseLeave={() => setHighlighted(-1)}
                  onClick={() => rateMovie(idx + 1)}
                />
              );
            })}
          </div>
          <p className="mt-2 text-green-200">{error}</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default MovieDetails;
