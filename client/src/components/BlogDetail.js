import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, addToFavorites, removeFromFavorites, getUserFavorites } from '../services/blogService';
import '../blogdetails.css';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchBlogAndFavorites = async () => {
            try {
                const blog = await getBlogById(id);
                setBlog(blog);

                const token = sessionStorage.getItem('token');
                if (token) {
                    const favorites = await getUserFavorites(token);
                    const isFavorite = favorites.some(fav => fav.blogId === blog.id);
                    setIsFavorite(isFavorite);
                }
            } catch (error) {
                console.error('Error fetching blog or favorites:', error);
            }
        };
        fetchBlogAndFavorites();
    }, [id]);

    const handleFavoriteToggle = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            if (isFavorite) {
                await removeFromFavorites(blog.id, token);
                console.log('Blog removed from favorites');
            } else {
                await addToFavorites(blog.id, token);
                console.log('Blog added to favorites');
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };

    const handleRentNow = () => {
        navigate(`/rentblog/${blog.id}`);
    };

    if (!blog) {
        return <p>Loading...</p>;
    }

    return (
        <div className="property-detail">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            {blog.image && <img src={`http://localhost:5000/uploads/${blog.image}`} alt="Blog" />}
            <button 
                className={`favorite-button ${isFavorite ? 'favorite' : ''}`} 
                onClick={handleFavoriteToggle}
            >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            {/* <button className="rent-button" onClick={handleRentNow}>Rent Now</button> */}
        </div>
    );
};

export default BlogDetail;
