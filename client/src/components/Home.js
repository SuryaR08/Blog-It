import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllBlogs, addToFavorites, getUserFavorites, removeFromFavorites } from '../services/blogService';
import '../home.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [favoriteBlogs, setFavoriteBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs = await getAllBlogs();
                setBlogs(blogs);
                setFilteredBlogs(blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
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
                const favoriteBlogIds = favoriteData.map(fav => fav.blogId);
                setFavoriteBlogs(favoriteBlogIds);
            } catch (error) {
                console.error('Error fetching user favorites:', error);
            }
        };

        fetchBlogs();
        fetchUserFavorites();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        console.log('Search term:', term);
        setSearchTerm(term);
        console.log('Blogs:', blogs); // Check if blogs is defined and has data
        const filtered = blogs.filter(blog => {
            console.log('Blog:', blog); // Check each blog object
            return (
                (blog.title && blog.title.toLowerCase().includes(term)) ||
                (blog.location && blog.location.toLowerCase().includes(term))
            );
        });
        console.log('Filtered Blogs:', filtered); // Check filtered results
        setFilteredBlogs(filtered);
    };
    
    

    const handleAddToFavorites = async (blogId) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            if (favoriteBlogs.includes(blogId)) {
                await removeFromFavorites(blogId, token);
                setFavoriteBlogs(favoriteBlogs.filter(id => id !== blogId));
                console.log('Blog removed from favorites');
            } else {
                await addToFavorites(blogId, token);
                setFavoriteBlogs([...favoriteBlogs, blogId]);
                console.log('Blog added to favorites');
            }
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };

    const navigateToProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="home-container">
            <header className="home-header">
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                    <div>
                        <img src="https://via.placeholder.com/1500x500" alt="Slide 1" />
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/1500x500" alt="Slide 2" />
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/1500x500" alt="Slide 3" />
                    </div>
                </Carousel>Carousel
                <h1>Blogs</h1>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {/* <button onClick={navigateToProfile}>Go to Profile</button> */}
            </header>
            <div className="property-list">
                {filteredBlogs.map(blog => (
                    <div key={blog.id} className="property-card">
                        <Link to={`/blog/${blog.id}`} className="property-card-link">
                            <div>
                                <img src={`http://localhost:5000/uploads/${blog.image}`} alt="Blog" className="property-image" />
                                <div className="property-details">
                                    <h2>{blog.title}</h2>
                                    <p>{blog.description}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="property-footer">
                            <button
                                onClick={() => handleAddToFavorites(blog.id)}
                            >
                                {favoriteBlogs.includes(blog.id) ? 'Added' : 'Add to Favorites'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
