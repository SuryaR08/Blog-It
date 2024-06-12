import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../addproperty.css'; // Import the CSS stylesheet

const AddProperty = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:5000/properties', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                navigate('/profile');
            } else {
                const errorData = await response.json();
                console.error('Error adding property:', errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-property-container">
            <form className="add-property-form" onSubmit={handleSubmit}>
                <h1>Add Property</h1>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

export default AddProperty;
