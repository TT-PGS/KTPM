import { apiRequest } from '../../utils/api';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';

// Fetch messages with a friend
export const fetchMessages = (param) => async (dispatch) => {
  try {
    const response = await apiRequest(`api/conversations?${param}`, 'GET');
    dispatch({
      type: FETCH_MESSAGES,
      payload: response,
    });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }
};

// Send a new message
export const sendMessage = (messageData) => async (dispatch) => {
  try {
    await apiRequest('api/conversations/message', 'POST', messageData);
    // dispatch({
    //   type: SEND_MESSAGE,
    //   payload: response,
    // });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
