import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Export the AuthUser interface that SessionContext is looking for
export interface AuthUser {
  employeeId: string | null;
  firstName: string;
  lastName: string;
  role: string;
}

// Combine it with the authentication status for the Redux state
interface AuthState extends AuthUser {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  // Simulating a logged-in user
  employeeId: '00000000-0000-0000-0000-000000000000', 
  firstName: 'John',
  lastName: 'Doe',
  role: 'Employee',
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<AuthUser>>) => {
      state.employeeId = action.payload.employeeId || state.employeeId;
      state.firstName = action.payload.firstName || state.firstName;
      state.lastName = action.payload.lastName || state.lastName;
      state.role = action.payload.role || state.role;
      state.isAuthenticated = true;
    },
    // 2. Renamed from 'logout' to 'clearCredentials' to satisfy SessionContext
    clearCredentials: (state) => {
      state.employeeId = null;
      state.firstName = '';
      state.lastName = '';
      state.role = '';
      state.isAuthenticated = false;
    },
  },
});

// Export the correctly named action
export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;