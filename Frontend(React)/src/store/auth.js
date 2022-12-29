import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  search:"",
  token: JSON.parse(localStorage.getItem("blogApp"))?.token || null,
  user: JSON.parse(localStorage.getItem("blogApp"))?.userDetails || null,
  userStats: JSON.parse(localStorage.getItem('userStats'))|| [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoggedIn(state) {
      const blogApp = JSON.parse(localStorage.getItem("blogApp"));
      if (blogApp) {
        state.token = blogApp.token;
        state.user = { ...blogApp.userDetails };
      }
    },
    login(state, action) {
      state.token = action.payload.token;
      state.user = { ...action.payload.userDetails };
      localStorage.setItem("blogApp", JSON.stringify(action.payload));
    },
    logout(state) {
      localStorage.removeItem("blogApp");
      state.user = null;
      state.token = null;
      state.search = null;
    },
    searchFunc(state,action){
      state.search = action.payload.search;
    },
    setUserStats(state, action) {
      state.userStats = action.payload;
    }
  },
});

export const { login, logout, isLoggedIn ,searchFunc, setUserStats} = authSlice.actions;

export const fetchUserStats = () => async (dispatch, getState) => {
  const state = getState();

  const search = state.auth.search;

  const id = state.auth.user.id;

  const token = state.auth.token;

  const url = search ? `http://localhost:9090/userBlogStats/${id}/${search}` : `http://localhost:9090/userBlogStats/${id}`;

  const resp = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch(setUserStats(resp.data));
  
  localStorage.setItem('userStats', JSON.stringify(resp.data));
}

export default authSlice.reducer;
