import { AUTH_TOKEN_KEY } from '../../constants/user';

export const saveUserData = (userData) => ({
  type: 'SAVE_USER_DATA',
  payload: userData,
});


export const fetchUserData = () => async (dispatch) => {
    try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}api/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        // remove tokon from user data
        delete data.token;

        // Dispatch the action to save user data to Redux
        dispatch({
            type: 'FETCH_USER_DATA_SUCCESS',
            payload: data,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch({
            type: 'FETCH_USER_DATA_FAILURE',
            payload: error.message,
        });
    }
};
