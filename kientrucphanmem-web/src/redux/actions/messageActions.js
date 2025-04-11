import { apiRequest, apiUploadImage } from '../../utils/api';

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
export const sendMessage = (messageData) => async () => {
  try {
    await apiRequest('api/conversations/message', 'POST', messageData);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

export const sendImage = (formData) => async () => {
  try {
    await apiUploadImage('api/conversations/upload-image', 'POST', formData);

  } catch (error) {
    console.error('Failed to send image:', error);
  }
}
