import axios from 'axios';

const token = localStorage.getItem("token");
const url = localStorage.getItem('server');

const api = axios.create({
    baseURL : url,
    headers: {
        'Content-Type'  : 'application/json',
        'Accept'        : 'application/json',
        'Authorization' : `Bearer ${token}`
    }
});

export default api;