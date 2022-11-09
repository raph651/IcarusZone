import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams, Link } from "react-router-dom";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
  let { search } = useParams();
  const navigate = useNavigate();

  const [word, errorStatus] = useFetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + search
  );
  useEffect(() => {
    console.log("word", word, "errorStatus", errorStatus);
  });

  if (errorStatus === 404) {
    return (
      <div className="mx-auto text-center pt-10 space-y-10">
        <h2 className="text-lg font-semibold text-indigo-600">
          Word not found, do you want to go back search for another one?
        </h2>
        <button
          onClick={() => {
            navigate("/dictionary");
          }}
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Back
        </button>
      </div>
    );
  }
  if (errorStatus) {
    return (
      <div className="mx-auto text-center pt-10 space-y-10">
        <h2 className="text-lg font-semibold text-indigo-600">
          There was a problem with the server, try again later.
        </h2>
        <button
          onClick={() => {
            navigate("/dictionary");
          }}
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Back
        </button>
      </div>
    );
  }
  return (
    <>
      {word?.[0]?.meanings ? (
        <div className="text-center pt-10 space-x-8 space-y-5">
          <h1>Here is the definition for {search}:</h1>
          {word[0].meanings.map((meaning) => {
            return (
              <>
                <p key={uuidv4()}>
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
