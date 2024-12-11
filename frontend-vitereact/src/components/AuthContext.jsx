import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isConnected, setIsConnected] = useState(
        !!localStorage.getItem("access_token")
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsConnected(!!localStorage.getItem("access_token"));
        };

        // Listen for local storage and custom events
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("localStorageUpdate", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("localStorageUpdate", handleStorageChange);
        };
    }, []);

    const updateAuthState = (isAuthenticated) => {
        setIsConnected(isAuthenticated);
        window.dispatchEvent(new Event("localStorageUpdate"));
    };

    return (
        <AuthContext.Provider value={{ isConnected, updateAuthState }}>
            {children}
        </AuthContext.Provider>
    );
}
