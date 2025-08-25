import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate("/");
    } else {
      console.error(res.message);
   }
  }
  return (
    <div
    className="min-h-screen flex items-center justify-center ">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col text-black gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              required
              className="px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <Button className = "mt-5" variant="secondary">Login</Button>
        </form>
        <p className="text-white mt-5 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
