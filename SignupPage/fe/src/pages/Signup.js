import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    console.log('signupInfo ->', signupInfo);

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        // Frontend Validation
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        if (name.length < 3) {
            return handleError('Name must be at least 3 characters long');
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return handleError('Please enter a valid email address');
        }

        if (password.length < 6) {
            return handleError('Password must be at least 6 characters long');
        }

        try {
            const url = "http://localhost:8081/auth/signup";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const result = await response.json();
                handleError(result.message || 'Signup failed');
                return;
            }

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                // Show success message
                handleSuccess(message || 'Signup successful');
                
                setTimeout(() => {
                    // Redirect to login page after 1 second
                    navigate('/login');
                    setSignupInfo({ name: '', email: '', password: '' });  
                }, 1000);
            } else {
                // Handle any backend error here
                handleError(result.message || 'Signup failed');
            }

        } catch (err) {
            handleError(err.message || 'An error occurred');
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account? 
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
