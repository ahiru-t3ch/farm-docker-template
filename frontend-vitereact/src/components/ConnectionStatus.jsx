import React, { useState, useEffect } from "react";
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
    return <Logout />
  } else {
    return <p className="text-white hover:text-blue-300 transition duration-300">TO DO: Display login here</p>
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
