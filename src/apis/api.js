import axios from 'axios';

const token = localStorage.getItem("token");
const url = "http://localhost:8000/api";
const api = axios.create({
    baseURL : url,
    headers: {
        'Content-Type'  : 'application/json',
        'Accept'        : 'application/json',
        'Authorization' : `Bearer ${token}`
    }
});

export default api;