import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = "http://localhost:8070/";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialstate = {
  user: getUserFromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/adminlogin",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(
        `${base_url}user/admin-login`,
        userData
      );
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const adminSlice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.error.message;
      });
  },
});

export default adminSlice.reducer;
