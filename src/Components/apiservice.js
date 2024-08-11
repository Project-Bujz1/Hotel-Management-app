import axios from 'axios';
const ROOM_API_URL = 'http://localhost:5000/rooms';
const TENANT_API_URL = 'http://localhost:5000/tenants';

// Room API functions
export const fetchRooms = async () => {
  const response = await fetch(ROOM_API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
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
