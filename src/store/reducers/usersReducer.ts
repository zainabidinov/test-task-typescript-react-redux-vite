import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types'; 

interface UsersState {
  users: UserData[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;