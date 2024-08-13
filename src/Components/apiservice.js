import axios from 'axios';
const ROOM_API_URL = 'https://smart-hostel-management-json-server.onrender.com/rooms';
const TENANT_API_URL = 'https://smart-hostel-management-json-server.onrender.com/tenants';

// Room API functions
export const fetchRooms = async () => {
  const response = await fetch(ROOM_API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Check if room number exists
export const checkRoomNumberExists = async (roomNumber) => {
  const response = await fetch(`${ROOM_API_URL}?roomNumber=${encodeURIComponent(roomNumber)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  // Check if there's any room with the given roomNumber
  return data.length > 0;
};


export const addRoom = async (room) => {
  const response = await fetch(ROOM_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(room),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateRoom = async (id, room) => {
  const response = await fetch(`${ROOM_API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(room),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteRoom = async (id) => {
  const response = await fetch(`${ROOM_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Tenant API functions
export const fetchTenants = async () => {
  const response = await fetch(TENANT_API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addTenant = async (tenant) => {
  const response = await fetch(TENANT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tenant),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateTenant = async (id, tenant) => {
  const response = await fetch(`${TENANT_API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tenant),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteTenant = async (id) => {
  const response = await fetch(`${TENANT_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
