import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:5555/",  // Backend server URL
  headers: {
    "Content-type": "application/json"
  }
});

// Add a request interceptor to the Axios instance
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || 'dummy token'


    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 