import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { loginUser, registerUser } from '../../services/api';
import type { LoginCredentials, SignUpCredentials } from '../../types';

// 1. Define State
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// 2. Helper to check Local Storage on load
const loadTokenFromStorage = (): string | null => {
  return localStorage.getItem("userToken");
};

const loadUserFromStorage = (): string | null => {
  return localStorage.getItem("userName");
};

const token = loadTokenFromStorage();

const initialState: AuthState = {
  token: token,
  isAuthenticated: !!token,
  username: loadUserFromStorage(),
  status: 'idle',
  error: null,
};

// 3. Async Thunk for Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return { token: data.token, username: credentials.username };
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Login failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: SignUpCredentials, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Registration failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// 4. Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      state.status = 'idle';
      state.error = null;
      
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
    },
    
    clearAuthError(state) {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.isAuthenticated = true;

        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userName", action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.error = (action.payload as string) || 'Login failed';
      })
      // NEW: Register Cases
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
        // Note: We do NOT set isAuthenticated = true here., it is just simulation of signing up
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Registration failed';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;