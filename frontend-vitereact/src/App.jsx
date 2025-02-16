import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationHeader from "./components/NavigationHeader";
import LandingPage from "./components/LandingPage";
import LoginSection from "./components/LoginSection";
import RegisterSection from "./components/RegisterSection";
import ToDoListSection from "./components/ToDoListSection";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ProfileSection from "./components/ProfileSection";


function App() {
  return (
    <Router>
      <NavigationHeader />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/register" element={<RegisterSection />} />

        <Route 
          path="/todolist" 
          element={<PrivateRoute>
            <ToDoListSection />
          </PrivateRoute>}
        />

        <Route 
          path="/profile" 
          element={<PrivateRoute>
            <ProfileSection />
          </PrivateRoute>}
        />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      
      <Footer />
    </Router>
  )
}

export default App;