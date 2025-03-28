export const apiRequest = async (endpoint, method, body) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
          method,
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
      }


      const data = await response.json();
      console.log('API Request Success:', data);
      console.log('Endpoint:', data.token);

      // Save token to localStorage for specific endpoints
      if ((endpoint.includes('register') || endpoint.includes('login')) && data.token) {
          localStorage.setItem('authToken', data.token);
      }

      return data;

  } catch (error) {
      console.error('API Request Error:', error);
      throw error;
  }
};
