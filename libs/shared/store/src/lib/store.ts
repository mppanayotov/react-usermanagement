import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '@react-usermanagement/shared/users';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch;
