import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
// import  config  from "../../Utils/header";

const base_url = "http://localhost:8070/";


const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};


const intialstate = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


export const getOrders = createAsyncThunk(
  "orders/allorders",
  async (config, thunkApi) => {
    try {
      const response = await axios.get(`${base_url}user/allorders`, config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSingleOrderData = createAsyncThunk(
  "orders/getorder",
  async (data, thunkApi) => {
    try {
      const response = await axios.get(
        `${base_url}user/getsingleorder/${data.id}`,
        data.config
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateOrderData = createAsyncThunk(
  "orders/update-order-status",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(
        `${base_url}user/order/update-order-status/${data.id}`,
        { status: data.status },
        data.config
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const resetState = createAction("Reset_all");

const orderSlice = createSlice({
  name: "orders",
  initialState: intialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.orders = [];
        state.message = action.error.message;
      })
      .addCase(getSingleOrderData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orderByUser = action.payload.orderItems;
      })
      .addCase(getSingleOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.orderByUser = [];
        state.message = action.error.message;
      })
      .addCase(updateOrderData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedStatus = action.payload;
      })
      .addCase(updateOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.updatedStatus = [];
        state.message = action.payload.response.data.message;
      })
      .addCase(resetState, () => intialstate);
  },
});

export default orderSlice.reducer;
