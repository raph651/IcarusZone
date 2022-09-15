import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Dictionary() {
  const [word, setWord] = useState("help");
  const navigate = useNavigate();

  return (
    <form
      onSubmit={() => {
        navigate("/definition/" + word);
      }}
      className="text-center pt-10 space-x-8 space-y-5"
    >
      <input
        className="text-white h-6.5 bg-indigo-500 border-2 hover:border-green-400 focus:border-red-400 border-solid focus:border-transparent"
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button className="mt-5 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        Search
      </button>
    </form>
  );
}
