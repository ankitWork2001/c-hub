import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}api/auth/signup`, {
        name,
        email,
        password,
      });
      setSuccess("Admin account created successfully!");
      setTimeout(() => navigate("/admin/login"), 2000); // Redirect after 2s
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Signup</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Name</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Admin Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-500 mt-1"
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
