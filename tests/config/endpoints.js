const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

export const endpoints = {
  ui: {
    home: `${BASE_URL}/`,
    login: `${BASE_URL}/login`,
    cart: `${BASE_URL}/cart`,
    admin: `${BASE_URL}/admin`,
    orders: `${BASE_URL}/orders`,
  },
  auth: {
    register: '/auth/register',
    login: '/auth/login',
  },
  users: {
    root: '/users',
  },
};
