import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const {isAuthenticated,user} = useAuth(); // Placeholder for authentication logic
  return (
    <div className="min-h-screen max-w-screen relative overflow-auto">
 
      <div className="absolute inset-0 z-0 min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />

 
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
            <Navbar  isAuthenticated={isAuthenticated} user={user} className = "p-10" />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>

        
      </div>
    </div>
  );
}

export default App;
