import { apiRequest } from '../../utils/api';

export const FETCH_FRIENDS_LIST = 'FETCH_FRIENDS_LIST';
export const SET_SELECTED_FRIEND = 'SET_SELECTED_FRIEND';

// Fetch friends list
export const fetchFriendsList = () => async (dispatch) => {
  try {
    const response = await apiRequest('api/friends', 'GET');
    console.log('Friends list:', response.friends
    );
    dispatch({
      type: FETCH_FRIENDS_LIST,
      payload: response.friends,
    });
  } catch (error) {
    console.error('Failed to fetch friends list:', error);
  }
};

// Set selected friend
export const setSelectedFriend = (friend) => ({
  type: SET_SELECTED_FRIEND,
  payload: friend,
});
