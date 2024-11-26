import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"; 
import About from "./components/About";
import ItemFunctionality from "./components/ItemFunctionality";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 shadow-md rounded-lg m-4 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-6">
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/">Home</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/about">About</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/items">Item functionality</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/register">Register</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<ItemFunctionality />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
