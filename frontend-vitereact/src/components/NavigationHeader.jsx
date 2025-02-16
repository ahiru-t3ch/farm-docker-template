import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"
import { AuthContext } from "./AuthContext";
import ConnectNavHandler from "./ConnectNavHandler";
import icon from '../assets/icon.png';

export default function NavigationHeader() {
    const { isConnected } = useContext(AuthContext);

    return (
        <header className="fixed w-full bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
                <div>
                    <img src={icon} alt="icon" className="h-8 w-auto" />
                </div>
                <ul className="flex space-x-6">
                    <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
                    <li><HashLink smooth to="/#about" className="hover:text-blue-500">About</HashLink></li>
                    <li><HashLink smooth to="/#features" className="hover:text-blue-500">Features</HashLink></li>
                    <li><HashLink smooth to="/#contact" className="hover:text-blue-500">Contact</HashLink></li>
                    {isConnected && (
                        <li><Link to="/todolist" className="hover:text-blue-500">Todo List</Link></li>
                    )}
                    {isConnected && (
                        <li><Link to="/profile" className="hover:text-blue-500">Profile</Link></li>
                    )}
                    <ConnectNavHandler />
                </ul>
            </nav>
        </header>
    )
}