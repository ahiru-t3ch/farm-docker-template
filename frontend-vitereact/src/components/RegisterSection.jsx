import React, { useState } from "react";
import axios from 'axios';

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function RegisterSection(){
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
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
    <section id="login" className="py-16 bg-gray-100">
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 mx-auto max-w-md"
            >
                <input
                type="text"
                name="first_name"
                placeholder="Fist Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded"
                />
                <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded"
                />
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
                >Register</button>
            </form>
            <p className="text-center mt-4">{message}</p>
        </div>
    </section>
    );
};