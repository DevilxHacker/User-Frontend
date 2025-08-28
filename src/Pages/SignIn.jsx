import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // axios instance with baseURL

export default function SignInForm() {
  const navigate = useNavigate();

  const [useEmail, setUseEmail] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const body = useEmail
        ? { email, password }
        : { username, password };

      // 1. Sign in
      await axios.post("/users/signin", body);

      // 2. Fetch user details
      let userDetails;
      if (useEmail) {
        const res = await axios.get(`/admin/userEmail/${email}`);
        userDetails = res.data;
    } else {
        const res = await axios.get(`/admin/userName/${username}`);
        userDetails = res.data;
    }
            
            // 3. Navigate based on role
      if (userDetails.data.role === "admin") {
        navigate("/admin");
      } else navigate(`/user/${userDetails.data.username}`);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Sign In</h2>

        <button
          type="button"
          onClick={() => setUseEmail(!useEmail)}
          className="w-full px-4 py-2 mb-4 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          {useEmail ? "Use Username Instead" : "Use Email Instead"}
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          {useEmail ? (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
