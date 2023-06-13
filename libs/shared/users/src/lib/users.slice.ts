import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

import * as dbJson from 'db.json';

export const USERS_FEATURE_KEY = 'users';

/**
 * Interface for the 'SharedUsers' data
 */
export interface UsersEntity {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  email: string;
  superadmin: boolean;
  permissions: {
    [permissionGroupName: string]: {
      [permission: string]: boolean;
    };
  };
}

/**
 * Class for the 'SharedUsers' data
 */
export class newUserTemplate implements UsersEntity {
  id = 0;
  firstName = '';
  lastName = '';
  role = 'user';
  status = 'active';
  email = '';
  superadmin = false;
  permissions = {
    'Permission group 1': {
      'Permission 11': false,
      'Permission 12': false,
      'Permission 13': false,
      'Permission 14': false,
      'Permission 15': false,
    },
    'Permission group 2': {
      'Permission 21': false,
      'Permission 22': false,
      'Permission 23': false,
      'Permission 24': false,
      'Permission 25': false,
    },
    'Permission group 3': {
      'Permission 31': false,
      'Permission 32': false,
      'Permission 33': false,
      'Permission 34': false,
      'Permission 35': false,
    },
  };

  constructor(
    id: number,
    inputData: {
      firstName: string;
      lastName: string;
      role: string;
      email: string;
    }
  ) {
    this.id = id;
    this.firstName = inputData.firstName;
    this.lastName = inputData.lastName;
    this.role = inputData.role;
    this.email = inputData.email;
  }
}

export interface UsersState extends EntityState<UsersEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const usersAdapter = createEntityAdapter<UsersEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchUsers())
 * }, [dispatch]);
 * ```
 */

export const fetchUsers = createAsyncThunk<UsersEntity[]>(
  'users/fetchStatus',
  async (_, thunkAPI) => {
    return dbJson.users;
  }
);

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const usersSlice = createSlice({
  name: USERS_FEATURE_KEY,
  initialState: initialUsersState,
  reducers: {
    add: usersAdapter.addOne,
    remove: usersAdapter.removeOne,
    update: usersAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<UsersEntity[]>) => {
          usersAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchUsers.rejected, (state: UsersState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const usersReducer = usersSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(usersActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const usersActions = usersSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllUsers);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getUsersState = (rootState: {
  [USERS_FEATURE_KEY]: UsersState;
}): UsersState => rootState[USERS_FEATURE_KEY];

export const selectAllUsers = createSelector(getUsersState, selectAll);

export const selectUsersEntities = createSelector(
  getUsersState,
  selectEntities
);
