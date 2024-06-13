import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../editblog.css';

const EditBlog = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/properties/${blogId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching blog:', errorData.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBlog();
    }, [blogId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
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
        formData.append('title', blog.title);
        formData.append('description', blog.description);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch(`http://localhost:5000/properties/${blogId}`, {
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
                console.error('Error updating blog:', errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="edit-property-container">
            <form className="edit-property-form" onSubmit={handleSubmit}>
                <h1>Edit Blog</h1>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={blog.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={blog.description} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button type="submit">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlog;
