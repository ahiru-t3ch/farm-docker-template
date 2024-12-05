import React from "react";
import icon from '../assets/icon.png';

export default function NavigationHeader() {
    return (
        <header className="fixed w-full bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
                <div>
                    <img src={icon} alt="icon" className="h-8 w-auto" />
                </div>
                <ul className="flex space-x-6">
                    <li><a href="#home" className="hover:text-blue-500">Home</a></li>
                    <li><a href="#about" className="hover:text-blue-500">About</a></li>
                    <li><a href="#features" className="hover:text-blue-500">Features</a></li>
                    <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}