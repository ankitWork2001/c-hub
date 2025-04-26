// redux/slices/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminInfo: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logoutAdmin: (state) => {
      state.adminInfo = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setAdminLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAdminError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAdminInfo,
  setToken,
  logoutAdmin,
  setAdminLoading,
  setAdminError,
} = adminSlice.actions;

export default adminSlice.reducer;
