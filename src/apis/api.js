import axios from 'axios';

const url = localStorage.getItem('server');

const api = axios.create({
    baseURL : url,
    headers: {
        'Content-Type'  : 'application/json',
        'Accept'        : 'application/json'
    }
});

export default api;