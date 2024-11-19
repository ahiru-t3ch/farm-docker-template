import { useState } from "react";

export default function CreateItemForm() {
    const [formData, setFormData] = useState({ name: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }) );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:8000/items", {
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
        }
      };

    return (
    <>
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