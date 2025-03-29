const initialState = {
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SAVE_USER_DATA':
          return {
              ...state,
              user: action.payload,
          };
      case 'FETCH_USER_DATA_SUCCESS':
        return {
            ...state,
            user: action.payload,
            error: null,
        };
    case 'FETCH_USER_DATA_FAILURE':
        return {
            ...state,
            user: null,
            error: action.payload,
        };
      default:
          return state;
  }
};

export default userReducer;
