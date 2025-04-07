import { AUTH_TOKEN_KEY } from '../constants/user'; // Import the constant

export const apiRequest = async (endpoint, method, body) => {
    console.log('API Request:', endpoint, method, body);
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const headers = {
    'Content-Type': 'application/json',
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }


    const data = await response.json();

    // Save token to localStorage for specific endpoints
    if ((endpoint.includes('register') || endpoint.includes('login')) && data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token); // nen dinh nghia authToken vao 1 bien constant
    }

    return data;

  } catch (error) {
      console.error('API Request Error:', error);
      throw error;
  }
};
