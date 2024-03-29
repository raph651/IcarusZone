import { useEffect, useState, useContext } from "react";
import { baseURL } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { loginContext } from "../App";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [changed, setChanged] = useState(false);
  const [loggedIn, setloggedIn] = useContext(loginContext);
  const location = useLocation();
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const url = baseURL + "api/token/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setloggedIn(true);
        navigate(
          location?.state?.previousURL
            ? location.state.previousURL
            : "/customers"
        );
      })
      .catch((e) => {
        console.log(e.message);
        console.log(baseURL)
      });
  }
  return (
    <div>
      <form onSubmit={login} className="max-w-sm m-3 w-full" id="login">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label for="username">Username</label>
          </div>
          <div className="">
            <input
              id="username"
              type="text"
              className="bg-gray-200 appearance-None border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setChanged(true);
              }}
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-12">
          <div className="md:w-1/4">
            <label for="password">Password</label>
          </div>
          <div className="">
            <input
              id="password"
              type="password"
              className="bg-gray-200 appearance-None border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setChanged(true);
              }}
            ></input>
          </div>
        </div>
      </form>
      <button
        form="login"
        className="no-underline bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        login
      </button>
    </div>
  );
}
