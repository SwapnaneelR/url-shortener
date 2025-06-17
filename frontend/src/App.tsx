import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen w-screen relative overflow-hidden"> 
      <div className="absolute inset-0 z-0 min-h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <Home />
      </div>
    </div>
  );
}

export default App;
