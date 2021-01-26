import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:3333',
    validateStatus: function (status) {
        return status >= 200 && status<300;
    }
});

api.interceptors.request.use(async config => {
    return config;
})

export default api; 
