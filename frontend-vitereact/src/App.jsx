import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationHeader from "./components/NavigationHeader";
import LandingPage from "./components/LandingPage";
import LoginSection from "./components/LoginSection";
import RegisterSection from "./components/RegisterSection";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <NavigationHeader />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/register" element={<RegisterSection />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      
      <Footer />
    </Router>
  )
}

export default App;