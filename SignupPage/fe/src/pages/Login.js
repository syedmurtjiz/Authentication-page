import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    console.log('loginInfo ->', loginInfo);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        // Frontend Validation
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = "http://localhost:8081/auth/login";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const result = await response.json();
                handleError(result.message || 'Login failed');
                return;
            }

            const result = await response.json();
            const { success, message, token } = result;

            if (success) {
                // Store token in localStorage or cookie for authentication
                localStorage.setItem('authToken', token);

                handleSuccess(message || 'Login successful');
                
                setTimeout(() => {
                    // Redirect to dashboard or homepage
                    navigate('/home');
                }, 1000);
            } else {
                handleError(result.message || 'Login failed');
            }
        } catch (err) {
            handleError(err.message || 'An error occurred');
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        autoFocus
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account? 
                    <Link to="/home">Home</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
