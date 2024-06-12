import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../editproperty.css'; // Import the CSS file

const EditProperty = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/properties/${propertyId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching property:', errorData.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProperty();
    }, [propertyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({
            ...property,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const formData = new FormData();
        formData.append('title', property.title);
        formData.append('description', property.description);
        formData.append('location', property.location);
        formData.append('price', property.price);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch(`http://localhost:5000/properties/${propertyId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                navigate('/profile');
            } else {
                const errorData = await response.json();
                console.error('Error updating property:', errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="edit-property-container">
            <form className="edit-property-form" onSubmit={handleSubmit}>
                <h1>Edit Property</h1>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={property.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={property.description} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" name="location" value={property.location} onChange={handleChange} required />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name="price" value={property.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button type="submit">Update Property</button>
            </form>
        </div>
    );
};

export default EditProperty;
