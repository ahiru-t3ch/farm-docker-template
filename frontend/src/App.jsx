import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"; 
import About from "./components/About";
import ItemFunctionality from "./components/ItemFunctionality";

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 p-4 shadow-md rounded">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-6">
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/">Home</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/about">About</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/items">Item functionality</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<ItemFunctionality />} />
      </Routes>
    </Router>
  )
}

export default App
