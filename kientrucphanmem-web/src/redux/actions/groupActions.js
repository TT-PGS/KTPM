import { apiRequest } from '../../utils/api';

export const FETCH_GROUP_LIST = 'FETCH_GROUP_LIST';
export const SET_SELECTED_GROUP = 'SET_SELECTED_GROUP';

export const createGroup = (groupData) => async (dispatch) => {
  try {
    const response = await apiRequest('api/conversations/group', 'POST', groupData);
    return response;
  } catch (error) {
    console.error('Failed to create group:', error);
    throw error;
  }
};

// Fetch group conversations
export const fetchConversationGroupList = () => async (dispatch) => {
  try {
    const response = await apiRequest('api/conversations/groups', 'GET');
    dispatch({
      type: FETCH_GROUP_LIST,
      payload: response,
    });
  } catch (error) {
    console.error('Failed to fetch group conversations:', error);
  }
};

// Set selected group
export const setSelectedGroup = (group) => ({
  type: SET_SELECTED_GROUP,
  payload: group,
});
