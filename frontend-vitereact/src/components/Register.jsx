import React, { useState } from "react";
import axios from 'axios';

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function Register(){
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        full_name: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${FASTAPI_BASE_URL}/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setMessage(response.data.message); // Access the response data
        } catch (error) {
            // Handling errors (including network errors)
            if (error.response) {
                // Server responded with a status code outside of the 2xx range
                setMessage(error.response.data.detail || "An error occurred");
            } else {
                // No response was received from the server
                setMessage("Unable to connect to the server");
            }
        }
    };

    return (
        <div className="p-4 m-4 rounded-lg bg-slate-300">
        <div className="grid grid-cols-1">
            <h2 className="text-center text-xl mb-4">Register</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 mx-auto max-w-md"
            >
                <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                >Register</button>
            </form>
            <p className="text-center mt-4">{message}</p>
        </div>
        </div>
    );
};