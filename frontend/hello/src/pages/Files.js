import { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/UseFetch";
import { baseURL } from "../shared";
import { useNavigate, useLocation } from "react-router-dom";
import { loginContext } from "../App";

const url = baseURL + "api/files/";

export default function Files() {
  const [files, setFiles] = useState();
  const [loggedIn, setloggedIn] = useContext(loginContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("files...");
  }, []);

  useEffect(() => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          console.log("401 login needed");
          setloggedIn(false);
          navigate("/login", { state: { previousURL: location.pathname } });
        } else if (!response.ok) {
          throw new Error("something went wrong");
        }
        console.log(response.status);

        return response.json();
      })
      .then((data) => {
        console.log(data.files);
        setFiles(data.files);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="text-lg font-semibold text-indigo-600 space-y-10">
      <h2>Customer's files:</h2>

      {files ? (
        <ul>
          {files.map((f) => {
            return (
                <li>
                  {f.name} <a href={f.file}>check here</a>
                </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
