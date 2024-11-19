import React, { useEffect, useState } from "react";

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
  
    console.log(trigger);

    return (
      <>
        <h2>Dummy Item List</h2>
        <ul>
          {items.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      </>
    );
}