import { useState } from "react";
import api from "../api/axios"; // axios.create with baseURL
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await api.post("/users/signup", formData);
      setSuccessMsg("Signup successful!");
      console.log("Server response:", res.data);
      navigate(`/user/${formData.username}`);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full px-3 py-2 mb-3 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 mb-3 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />

        {errorMsg && <p className="mb-2 text-sm text-red-500">{errorMsg}</p>}
        {successMsg && <p className="mb-2 text-sm text-green-500">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
