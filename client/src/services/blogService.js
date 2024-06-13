import axios from 'axios';

const API_URL = 'http://localhost:5000/blogs';

export const getAllBlogs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

export const addBlog = async (blog, token) => {
    try {
        const response = await axios.post(API_URL, blog, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding blog:', error);
        throw error;
    }
};

export const getUserBlogs = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user blogs:', error);
        throw error;
    }
};

export const deleteBlog = async (blogId, token) => {
    try {
        await axios.delete(`${API_URL}/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};

export const getBlogById = async (blogId) => {
    try {
        const response = await axios.get(`${API_URL}/${blogId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        throw error;
    }
};

export const addToFavorites = async (blogId, token) => {
    try {
        const response = await axios.post('http://localhost:5000/favorites', { blogId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
};



export const getUserFavorites = async (token) => {
    try {
        const response = await axios.get('http://localhost:5000/favorites', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        throw error;
    }
};


export const removeFromFavorites = async (blogId, token) => {
    try {
        const response = await fetch(`http://localhost:5000/favorites/${blogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
    }
};
