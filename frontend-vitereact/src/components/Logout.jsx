import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage/sessionStorage
        localStorage.removeItem('access_token'); // or sessionStorage.removeItem('token');

        // Optionally remove additional user info stored in state
        // e.g., localStorage.removeItem('user');

        // Redirect to the login page
        navigate('/login');
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
