import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const register = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

export const login = (user) => {
    return axios.post(`${API_URL}/login`, user);
};

