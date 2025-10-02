import React, { useState, useEffect, useContext } from "react";
import API from "../services/api-services";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);

  const [token, setToken] = useCookies("mr-token");
  const navigate = useNavigate();
  const isDisabled = username && password ? false : true;

  useEffect(() => {
    console.log("token", token);
    if (token["mr-token"]) {
      navigate("/movies");
    }
  }, [token]);

  const userLogin = async () => {
    const resp = await API.userLogin({ username, password });
    if (resp) {
      setToken("mr-token", resp.token);
      navigate("/movies");
    }
  };

  const userRegister = async () => {
    const resp = await API.userRegister({ username, password });
    console.log("resp in register", resp);
    if (resp) {
      console.log("Resp in register", resp);
      userLogin();
    }
  };

  return (
    <div className="App">
      <header className="App-header border-b-2 border-orange-200 pb-6 mb-6">
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      </header>
      <div className="grid grid-cols-2 gap-2 w-1/2">
        <label htmlFor="username">Username</label>
        <input
          id="usename"
          type="text"
          placeholder="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />

        {isLoginView ? (
          <button
            className="col-span-2 my-1.5"
            onClick={userLogin}
            disabled={isDisabled}
          >
            Login
          </button>
        ) : (
          <button
            className="col-span-2 my-1.5"
            onClick={userRegister}
            disabled={isDisabled}
          >
            Register
          </button>
        )}
      </div>
      {isLoginView ? (
        <p className="cursor-pointer" onClick={() => setIsLoginView(false)}>
          Don't have an account? Click here to register.
        </p>
      ) : (
        <p onClick={() => setIsLoginView(true)}>
          Already have an account? Login here
        </p>
      )}
    </div>
  );
}

export default Auth;
