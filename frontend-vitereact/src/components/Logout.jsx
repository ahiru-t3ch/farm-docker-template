import { useNavigate } from 'react-router-dom';
//import axios from 'axios'; // TO DO: Axios for LogoutEndpoint
import { updateLocalStorage } from './ConnectNavHandler';

//const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function Logout(){
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("access_token");
        
        if (!token) {
            console.log("No access token found");
            navigate('/login');
            return;
        }

        try {
            // To Do: Call logout endpoint
            //localStorage.removeItem('access_token');
            updateLocalStorage("access_token", null);
        } catch (error) {
            console.log(error);
        } finally {
            navigate('/login');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="hover:text-blue-500 transition duration-300"
        >
            Sign Out
        </button>
    );
};