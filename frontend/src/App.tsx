import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-start gap-2 m-52">
      <h6 className="text-xl">Welcome, please click to continue</h6>
      <button
        className="px-3 py-1 font-bold text-white rounded-lg bg-color-1"
        onClick={() => navigate("/suggestions", { replace: true })}
      >
        Lets go
      </button>
    </div>
  );
}

export default App;
