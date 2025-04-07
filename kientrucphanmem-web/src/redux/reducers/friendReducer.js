import { FETCH_FRIENDS_LIST, SET_SELECTED_FRIEND } from '../actions/friendActions';

const initialState = {
  friendsList: [],
  selectedFriend: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FRIENDS_LIST:
      return {
        ...state,
        friendsList: action.payload,
      };
    case SET_SELECTED_FRIEND:
      return {
        ...state,
        selectedFriend: action.payload,
      };
    default:
      return state;
  }
};

export default friendReducer;
