import { useState } from "react";
import axios from 'axios';

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function CreateItemForm({onRefresh}) {
    const [formData, setFormData] = useState({ name: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }) );
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/items`, {
          name: formData.name,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.status === 200) {
          setFormData({ name: "" });
        } else {
          setMessage(`Error: ${response.data.detail || "Something went wrong"}`);
        }
      } catch (error) {
        if (error.response) {
          // If the error is from the server, we get a response object
          setMessage(`Error: ${error.response.data.detail || "Something went wrong"}`);
        } else {
          // For other errors (e.g., network issues)
          setMessage(`Error: ${error.message}`);
        }
      } finally {
        onRefresh();
      }
    };

    return (
    <>
      <div className="grid gap-2 p-4">
        <h2 className="text-left text-sm">Create Item for list</h2>
        <form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="nameItem" className="block text-sm font-medium text-gray-700">Name:</label>
              <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Create Item
            </button>
            <p className="text-center mt-4">{message}</p>
        </form>
      </div>
    </>
    )
}