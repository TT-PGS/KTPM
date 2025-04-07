import { FETCH_MESSAGES, SEND_MESSAGE } from '../actions/messageActions';

const initialState = {
  messages: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      console.log('action.payload-----------------FETCH_MESSAGES', action.payload);
      return {
        ...state,
        messages: action.payload,
      };
    case SEND_MESSAGE:
      console.log('action.payload-----------------SEND_MESSAGE', action.payload);
      // console.log('state.messages-----------------SEND_MESSAGE', [...state.messages, action.payload]);
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
