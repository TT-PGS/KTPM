import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import friendReducer from '../reducers/friendReducer';
import messageReducer from '../reducers/messageReducer';
import groupReducer from '../reducers/groupReducer';

const rootReducer = combineReducers({
  user: userReducer,
  friend: friendReducer,
  message: messageReducer,
  group: groupReducer,
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer, // Pass the root reducer
});

export default store;
