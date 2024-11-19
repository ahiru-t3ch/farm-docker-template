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
        <h2>Create Item for list</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="nameItem">Name:</label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
            </div>
            <button type="submit">
                Create Dummy Item Name
            </button>
        </form>
    </>
    )
}