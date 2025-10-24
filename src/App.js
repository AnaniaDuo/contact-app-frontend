import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import MovieForm from "./components/MovieForm";
import Contacts from "./components/Contacts";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { PiSignOutFill } from "react-icons/pi";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState(null);

  const navigate = useNavigate();
  const [token, setToken, deleteToken] = useCookies("mr-token");

  useEffect(() => {
    if (!token["mr-token"]) {
      navigate("/");
    }
  }, [token]);

  // const movieClicked = (movie, isEdit) => {
  //   if (isEdit) {
  //     setSelectedMovie(null);
  //     setEditedMovie(movie);
  //   } else {
  //     setSelectedMovie(movie);
  //     setEditedMovie(null);
  //   }
  // };

  // const addMovieClicked = () => {
  //   setSelectedMovie(null);
  //   setEditedMovie({ title: "", description: "" });
  // };

  const userLogout = () => {
    deleteToken(["mr-token"]);
    navigate("/");
  };

  return (
    <div className="App">
      <header className="App-header border-b-2 border-orange-200 pb-6">
        <h1>Contacts</h1>
      </header>
      <PiSignOutFill
        className="absolute top-5 right-5 text-2xl cursor-pointer"
        onClick={userLogout}
      />

      {/* <div className="grid grid-cols-2 mt-6">
        <div>
          <MovieList
            movieClicked={movieClicked}
            updatedMovie={updatedMovie}
            newMovie={newMovie}
          />
          <button onClick={addMovieClicked}>Add a New Movie</button>
        </div>
        <MovieDetails
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          setUpdatedMovie={setUpdatedMovie}
        />
        {editedMovie && (
          <MovieForm
            movie={editedMovie}
            setUpdatedMovie={setUpdatedMovie}
            setNewMovie={setNewMovie}
          />
        )}
      </div> */}
      <div className="w-screen flex items-center justify-center">
        <Contacts />
      </div>
    </div>
  );
}

export default App;
