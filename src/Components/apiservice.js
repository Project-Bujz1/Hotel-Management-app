import axios from 'axios';

const BASE_URL = 'http://your-backend-api-url.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all rooms
export const fetchRooms = () => api.get('/rooms');

// Add a new room
export const addRoom = (roomData) => api.post('/rooms', roomData);

// Update a room
export const updateRoom = (roomId, roomData) => api.put(`/rooms/${roomId}`, roomData);

// Delete a room
export const deleteRoom = (roomId) => api.delete(`/rooms/${roomId}`);
