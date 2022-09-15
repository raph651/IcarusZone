import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();
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
