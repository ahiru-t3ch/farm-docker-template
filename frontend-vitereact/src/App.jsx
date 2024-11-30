import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"; 
import About from "./components/About";
import ItemFunctionality from "./components/ItemFunctionality";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ConnectionStatus from "./components/ConnectionStatus";


function App() {

  const accessToken = localStorage.getItem("access_token");

  return (
    <Router>
      <div className="grid grid-cols-6">

      <nav className="bg-blue-600 shadow-md rounded-lg m-4 p-4 col-span-5">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-6">
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/">Home</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/about">About</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/items">Item functionality</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/register">Register</Link></li>
            <li className="text-white hover:text-blue-300 transition duration-300"><Link to="/login">Login</Link></li>
            
            {/*<li className="text-white hover:text-blue-300 transition duration-300">
              <Logout />
            </li>*/}
          </ul>
        </div>
      </nav>
      
      <div className="bg-blue-600 shadow-md rounded-lg m-4 p-4 col-span-1">
        <ConnectionStatus />
      </div>

      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<ItemFunctionality />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      <Footer />

    </Router>
  )
}

export default App
