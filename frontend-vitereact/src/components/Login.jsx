import React, { useState } from "react";
import axios from 'axios';


const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${FASTAPI_BASE_URL}/token`, 
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
      );      
      localStorage.setItem("access_token", response.data.access_token);
      setMessage("Login successful!");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.detail || "Invalid username or password");
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      <p className={`text-center mt-4 ${isLoggedIn ? "text-green-600" : "text-red-600"}`}>
        {message}
      </p>
    </div>
  );
};

export default Login;
