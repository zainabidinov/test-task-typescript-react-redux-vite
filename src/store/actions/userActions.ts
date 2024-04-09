import { createAction } from '@reduxjs/toolkit';
import { UserData } from '../../types';

export const setUsers = createAction<UserData[]>('users/setUsers');