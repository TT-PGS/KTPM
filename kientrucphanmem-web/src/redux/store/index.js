import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer, // Add reducers here
    },
});

export default store;
