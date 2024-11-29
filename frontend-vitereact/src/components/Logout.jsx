import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("access_token");
        
        if (!token) {
            console.log("No access token found");
            navigate('/login');
            return;
        }

        try {
            // Error 422 bad content
            /*await axios.post(
              `${FASTAPI_BASE_URL}/logout`, 
              token.toString(),
              {
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                  },
              }
            );*/
            localStorage.removeItem('access_token');      
          } catch (error) {
            console.log(error);
          } finally {
            navigate('/login');
          }
    };

    return (
        <button
            onClick={handleLogout}
            className="text-white hover:text-blue-300 transition duration-300"
        >
            Sign Out
        </button>
    );
};

export default Logout;
