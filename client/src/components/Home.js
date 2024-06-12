import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProperties, addToFavorites, getUserFavorites, removeFromFavorites } from '../services/propertyService';
import '../home.css';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const properties = await getAllProperties();
                setProperties(properties);
                setFilteredProperties(properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
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
                const favoritePropertyIds = favoriteData.map(fav => fav.propertyId);
                setFavoriteProperties(favoritePropertyIds);
            } catch (error) {
                console.error('Error fetching user favorites:', error);
            }
        };

        fetchProperties();
        fetchUserFavorites();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = properties.filter(property =>
            property.title.toLowerCase().includes(term.toLowerCase()) ||
            property.location.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProperties(filtered);
    };

    const handleAddToFavorites = async (propertyId) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            if (favoriteProperties.includes(propertyId)) {
                await removeFromFavorites(propertyId, token);
                setFavoriteProperties(favoriteProperties.filter(id => id !== propertyId));
                console.log('Property removed from favorites');
            } else {
                await addToFavorites(propertyId, token);
                setFavoriteProperties([...favoriteProperties, propertyId]);
                console.log('Property added to favorites');
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
                <h1>Available Properties</h1>
                <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {/* <button onClick={navigateToProfile}>Go to Profile</button> */}
            </header>
            <div className="property-list">
                {filteredProperties.map(property => (
                    <div key={property.id} className="property-card">
                        <Link to={`/property/${property.id}`} className="property-card-link">
                            <div>
                                <img src={`http://localhost:5000/uploads/${property.image}`} alt="Property" className="property-image" />
                                <div className="property-details">
                                    <h2>{property.title}</h2>
                                    <p>{property.description}</p>
                                    <p><strong>Location:</strong> {property.location}</p>
                                    <p><strong>Price:</strong> ${property.price}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="property-footer">
                            <button
                                onClick={() => handleAddToFavorites(property.id)}
                            >
                                {favoriteProperties.includes(property.id) ? 'Added' : 'Add to Favorites'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
