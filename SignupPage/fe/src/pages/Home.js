import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';

function Home() {
    const navigate = useNavigate();

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div>
            <h1 className='heading'>Welcome to Home</h1>
            <button onClick={handleLogout} className='logout'>Logout</button>
            <ToastContainer />
        </div>
    );
}

export default Home;
