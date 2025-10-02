const API_URL = process.env.REACT_APP_API_URL;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
// const API_URL = "https://anhhduong.pythonanywhere.com/api";
// const AUTH_URL = "https://anhhduong.pythonanywhere.com";
// const API_URL = "http://127.0.0.1:8000/api";
// const AUTH_URL = "http://127.0.0.1:8000";

export default class API {
  static async userLogin(body) {
    const response = await fetch(`${AUTH_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) return null;
    return await response.json();
  }

  static async userRegister(body) {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) return null;
    return await response.json();
  }

  static async getMovies(token) {
    const response = await fetch(`${API_URL}/movies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  static getNewMovie = async (movieId, token) => {
    const response = await fetch(`${API_URL}/movies/${movieId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  };

  static rateMovie = async (movieId, body, token) => {
    const response = await fetch(`${API_URL}/movies/${movieId}/rate_movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  };

  static async updateMovie(movieId, body, token) {
    const response = await fetch(`${API_URL}/movies/${movieId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  static async createMovie(body, token) {
    const response = await fetch(`${API_URL}/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) return null;
    return await response.json();
  }

  static async deleteMovie(movieId, token) {
    const response = await fetch(`${API_URL}/movies/${movieId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) return false;
    return true;
  }
}
