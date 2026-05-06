import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(username, password);

    if (success) {
      navigate("/", { replace: true });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex h-screen w-full">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">Subscriptify</h1>
        <p className="text-lg opacity-90">
          Manage subscriptions like a pro. Track, pause, and optimize effortlessly.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-2 text-black">
            Welcome 👋
          </h2>
          <p className="text-sm text-gray-500 mb-6 tracking-tight font-semibold">
            Login to your dashboard
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4 mt-4">
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Login
          </button>

          {/* <p className="text-xs text-gray-400 text-center mt-4">
            Demo: use any credentials
          </p> */}
        </form>
      </div>
    </div>
  );
}