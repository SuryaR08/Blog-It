import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/register', {
                username,
                password,
                email
            });
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error.response?.data || error.message);
            alert('Registration failed');
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
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div className="toggle-container">
                    <span>Existing user? </span>
                    <span className="toggle-link" onClick={() => navigate('/login')}>Login now!</span>
                </div>
            </div>
        </div>
    );
};

export default Register;
