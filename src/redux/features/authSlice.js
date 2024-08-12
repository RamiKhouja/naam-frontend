import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    userProfile: null,
    organization: null,
    departments: null
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearToken: (state) => {
      state.accessToken = null;
      state.userProfile = null;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setOrganization: (state, action) => {
      state.organization = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    }
  },
});

export const { setToken, clearToken, setUserProfile, setOrganization, setDepartments } = authSlice.actions;

export default authSlice.reducer;