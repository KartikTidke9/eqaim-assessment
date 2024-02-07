import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="relative m-52 gap-2 flex flex-col items-start">
      <h6 className="text-xl">Welcome, please click to continue</h6>
      <button
        className="px-3 py-1 rounded-lg font-bold bg-color-1 text-white"
        onClick={() => navigate("/suggestions", { replace: true })}
      >
        Lets go
      </button>
    </div>
  );
}

export default App;
