const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SAVE_USER_DATA':
          return {
              ...state,
              user: action.payload,
          };
      default:
          return state;
  }
};

export default userReducer;
