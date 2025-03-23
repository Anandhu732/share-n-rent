import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

const baseURL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle specific error status codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          toast({
            title: 'Session expired',
            description: 'Please log in again to continue.',
            variant: 'destructive',
          });
          break;
          
        case 403:
          // Forbidden
          toast({
            title: 'Access denied',
            description: 'You do not have permission to perform this action.',
            variant: 'destructive',
          });
          break;
          
        case 404:
          // Not found
          toast({
            title: 'Resource not found',
            description: 'The requested resource could not be found.',
            variant: 'destructive',
          });
          break;
          
        case 500:
          // Server error
          toast({
            title: 'Server error',
            description: 'Something went wrong on our end. Please try again later.',
            variant: 'destructive',
          });
          break;
          
        default:
          // Other errors
          toast({
            title: 'Error',
            description: response.data?.message || 'Something went wrong. Please try again.',
            variant: 'destructive',
          });
      }
    } else {
      // Network error or other issues
      toast({
        title: 'Connection error',
        description: 'Unable to connect to the server. Please check your internet connection.',
        variant: 'destructive',
      });
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login/', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },
  
  updateProfile: async (profileData: any) => {
    const response = await api.put('/auth/profile/', profileData);
    return response.data;
  },
};

// Items API calls
export const itemsAPI = {
  getItems: async (params?: any) => {
    const response = await api.get('/items/', { params });
    return response.data;
  },
  
  getItemById: async (id: string) => {
    const response = await api.get(`/items/${id}/`);
    return response.data;
  },
  
  createItem: async (itemData: any) => {
    const response = await api.post('/items/', itemData);
    return response.data;
  },
  
  updateItem: async (id: string, itemData: any) => {
    const response = await api.put(`/items/${id}/`, itemData);
    return response.data;
  },
  
  deleteItem: async (id: string) => {
    const response = await api.delete(`/items/${id}/`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },
};

// Bookings API calls
export const bookingsAPI = {
  getBookings: async (params?: any) => {
    const response = await api.get('/bookings/', { params });
    return response.data;
  },
  
  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}/`);
    return response.data;
  },
  
  createBooking: async (bookingData: any) => {
    const response = await api.post('/bookings/', bookingData);
    return response.data;
  },
  
  updateBooking: async (id: string, bookingData: any) => {
    const response = await api.put(`/bookings/${id}/`, bookingData);
    return response.data;
  },
  
  cancelBooking: async (id: string) => {
    const response = await api.post(`/bookings/${id}/cancel/`);
    return response.data;
  },
};

// Reviews API calls
export const reviewsAPI = {
  getReviews: async (params?: any) => {
    const response = await api.get('/reviews/', { params });
    return response.data;
  },
  
  createReview: async (reviewData: any) => {
    const response = await api.post('/reviews/', reviewData);
    return response.data;
  },
  
  updateReview: async (id: string, reviewData: any) => {
    const response = await api.put(`/reviews/${id}/`, reviewData);
    return response.data;
  },
  
  deleteReview: async (id: string) => {
    const response = await api.delete(`/reviews/${id}/`);
    return response.data;
  },
};

export default api;
