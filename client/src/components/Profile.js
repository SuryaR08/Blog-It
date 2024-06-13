import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFavorites, removeFromFavorites } from '../services/blogService';
import '../profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/users/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching user data:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchBlogs = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/blogs/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching blogs:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchUserFavorites = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const favoriteData = await getUserFavorites(token);
                setFavorites(favoriteData);
            } catch (error) {
                console.error('Error fetching user favorites:', error);
            }
        };

        fetchUserData();
        fetchBlogs();
        fetchUserFavorites();
    }, []);

    const handleEdit = (blogId) => {
        navigate(`/editblog/${blogId}`);
    };

    const handleDelete = async (blogId) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/blogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setBlogs(blogs.filter(blog => blog.id !== blogId));
            } else {
                const errorData = await response.json();
                console.error('Error deleting blog:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemoveFromFavorites = async (blogId) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            await removeFromFavorites(blogId, token);
            setFavorites(favorites.filter(favorite => favorite.Blog.id !== blogId));
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>My Blogs</h1>
            </header>
            {user ? (
                <div className="user-details-card">
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
            {blogs.length > 0 ? (
                <div className="property-list">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="property-card">
                            <div className="property-details">
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>
                                {blog.image && <img src={`http://localhost:5000/uploads/${blog.image}`} alt={blog.title} className="property-image" />}
                            </div>
                            <div className="property-buttons">
                                <button onClick={() => handleEdit(blog.id)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(blog.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No blogs found.</p>
            )}
            {favorites.length > 0 && (
                <div className="favorites-section">
                    <h2>Favorite Blogs</h2>
                    <div className="property-list">
                        {favorites.map((favorite) => (
                            <div key={favorite.id} className="property-card">
                                <div className="property-details">
                                    <h2>{favorite.Blog.title}</h2>
                                    <p>{favorite.Blog.description}</p>
                                    {favorite.Blog.image && <img src={`http://localhost:5000/uploads/${favorite.Blog.image}`} alt={favorite.Blog.title} className="property-image" />}
                                </div>
                                <div className="property-buttons">
                                    <button className="remove-favorite" onClick={() => handleRemoveFromFavorites(favorite.Blog.id)}>Remove from Favorites</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
