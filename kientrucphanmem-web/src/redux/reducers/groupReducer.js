import { FETCH_GROUP_LIST, SET_SELECTED_GROUP } from '../actions/groupActions';

const initialState = {
  groupList: [],
  selectedGroup: null,
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP_LIST:
      return {
        ...state,
        groupList: action.payload,
      };
    case SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
