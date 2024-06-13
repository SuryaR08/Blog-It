import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Blog-It</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        <Link to="/profile">{user.username || 'Profile'}</Link>
                        <Link to="/add-property">Add Blog</Link>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;