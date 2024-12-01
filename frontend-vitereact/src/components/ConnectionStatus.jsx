import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";


const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    // Event listener for localStorage changes
    const handleStorageChange = () => {
      setIsConnected(!!localStorage.getItem("access_token"));
    };

    // Listen for localStorage changes from other tabs/windows
    window.addEventListener("storage", handleStorageChange);

    // Listen for local changes using a custom event
    window.addEventListener("localStorageUpdate", handleStorageChange);

    return () => {
      // Clean up listeners when the component is unmounted
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdate", handleStorageChange);
    };
  }, []);

  if (isConnected) {
    return (<Logout />);
  } else {
    return (
      <>
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-6">
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </>
    );
  }
};

// Utility function to trigger custom localStorage update events
export const updateLocalStorage = (key, value) => {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }

  // Trigger a custom event for local updates
  const event = new Event("localStorageUpdate");
  window.dispatchEvent(event);
};

export default ConnectionStatus;
