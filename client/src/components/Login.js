import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../auth.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { username, password });
            onLogin(response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="toggle-container">
                    <span>Don't have an account? </span>
                    <span className="toggle-link" onClick={() => navigate('/register')}>Register now!</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
