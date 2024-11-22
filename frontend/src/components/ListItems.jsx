import React, { useEffect, useState } from "react";
import axios from 'axios';

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function ListItems({trigger}) {
    const [items, setItems] = useState([]);

    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch(`${FASTAPI_BASE_URL}/items`);
          if (!response.ok) throw new Error("Failed to fetch items");
          const data = await response.json();
          setItems(data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
  
      fetchItems();
    }, [trigger]);

    const handleDelete = async (id) => {
        await axios.delete(`${FASTAPI_BASE_URL}/items/${id}`);
        axios.get(`${FASTAPI_BASE_URL}/items/`)
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching data:', error));
      };
  
    return (
      <>
        <h2 className="text-lg font-semibold mb-4">Dummy Item List</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li 
            className="flex justify-between items-center p-2 border rounded shadow-sm"
            key={item._id}
            >
                <span className="text-gray-800">{item.name}</span>
                <button 
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={() => handleDelete(item._id)}
                >Delete</button>
            </li>
          ))}
        </ul>
      </>
    );
}