import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export default function Definition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  const [meaning, setMeaning] = useState();
  let { search } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((response) => {
        console.log(response.status);
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login");
        } else if (response.status === 500) {
          setError(true);
        }
        if (!response.ok) {
          setError(true);
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setMeaning(data[0].meanings);
        setWord(data[0].word);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });
  if (notFound || error === true) {
    navigate("/definition/notfound");
  }
  return (
    <>
      {word && meaning ? (
        <div className="text-center pt-10 space-x-8 space-y-5">
          <h1>Here is the definition for {word}</h1>
          {meaning.map((meaning) => {
            return (
              <>
                <p key={uuidv4}>
                  {meaning.partOfSpeech + ": "}
                  {meaning.definitions[0].definition}
                </p>
              </>
            );
          })}
          <button
            onClick={() => {
              navigate("/dictionary");
            }}
            className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Back
          </button>
        </div>
      ) : null}
    </>
  );
}
