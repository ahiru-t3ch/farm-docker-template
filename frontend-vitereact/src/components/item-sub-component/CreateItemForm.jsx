import { useState } from "react";

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function CreateItemForm({onRefresh}) {
    const [formData, setFormData] = useState({ name: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }) );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log(FASTAPI_BASE_URL);
            const response = await fetch(`${FASTAPI_BASE_URL}/items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "name": formData.name,
            }),
          });
    
          if (response.ok) {
            setFormData({ name: ""});
            console.log("OK");
          } else {
            const errorData = await response.json();
            console.log(`Error: ${errorData.detail || "Something went wrong"}`);
          }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        } finally {
            console.log("END");
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
        </form>
      </div>
    </>
    )
}