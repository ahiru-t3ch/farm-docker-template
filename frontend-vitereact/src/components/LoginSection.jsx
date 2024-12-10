import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { updateLocalStorage } from './ConnectNavHandler';


export default function LoginSection() {
  const navigate = useNavigate();

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
      updateLocalStorage("access_token", response.data.access_token);
      setMessage("Login successful!");
      setIsLoggedIn(true);
      navigate("/")
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.detail || "Invalid username or password");
      setIsLoggedIn(false);
    }
  };

  const handleRegisterClick = () => {
    console.log("Go to register");
    navigate('/register');
  };

  return (
    <section id="login" className="py-16 bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <div className="text-right">
            <a href="#forgot-password" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className={`text-center mt-4 ${isLoggedIn ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
        <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?<br/>
          <span
              onClick={handleRegisterClick}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register
            </span>
        </p>
        </div>
      </div>
    </section>
  );
};