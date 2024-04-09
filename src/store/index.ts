import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './reducers/usersReducer'; // Adjust the import path as needed

const store = configureStore({
    reducer: {
        users: usersReducer,
      },
});

export default store;
