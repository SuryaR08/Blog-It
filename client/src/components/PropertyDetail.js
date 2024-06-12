import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById, addToFavorites, removeFromFavorites, getUserFavorites } from '../services/propertyService';
import '../propertydetails.css';

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchPropertyAndFavorites = async () => {
            try {
                const property = await getPropertyById(id);
                setProperty(property);

                const token = sessionStorage.getItem('token');
                if (token) {
                    const favorites = await getUserFavorites(token);
                    const isFavorite = favorites.some(fav => fav.propertyId === property.id);
                    setIsFavorite(isFavorite);
                }
            } catch (error) {
                console.error('Error fetching property or favorites:', error);
            }
        };
        fetchPropertyAndFavorites();
    }, [id]);

    const handleFavoriteToggle = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            if (isFavorite) {
                await removeFromFavorites(property.id, token);
                console.log('Property removed from favorites');
            } else {
                await addToFavorites(property.id, token);
                console.log('Property added to favorites');
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };

    const handleRentNow = () => {
        navigate(`/rentproperty/${property.id}`);
    };

    if (!property) {
        return <p>Loading...</p>;
    }

    return (
        <div className="property-detail">
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            {property.image && <img src={`http://localhost:5000/uploads/${property.image}`} alt="Property" />}
            <button 
                className={`favorite-button ${isFavorite ? 'favorite' : ''}`} 
                onClick={handleFavoriteToggle}
            >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button className="rent-button" onClick={handleRentNow}>Rent Now</button>
        </div>
    );
};

export default PropertyDetail;
