import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
// import { base_url, config } from "../../Utils/Config";

// const base_url = "http://localhost:8070/";
// localStorage.setItem("customer", JSON.stringify({
//   _id: "123456789",
//   name: "John Doe",
//   email: "john@example.com",
//   mobile: "+1234567890",
//   token: "dummy-token"
// }));

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
console.log(getTokenFromLocalStorage);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8070/user/register",
        userData
      );
      if (response.data) {
        if (response.data) {
          localStorage.setItem("customer", JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8070/user/login",
        userData
      );
      if (response.data) {
        if (response.data) {
          localStorage.setItem("customer", JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// console.log(getCustomerFromLocalStorage);

export const addToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8070/user/cart",
        cartData,
        config
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk("user/cart/get", async (thunkAPI) => {
  try {
    const response = await axios.get(
      "http://localhost:8070/user/get-cart/",
      config
    );
    console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeProductFromCart = createAsyncThunk(
  "user/cart/delete",
  async (cartItemId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/user/delete-product-from-cart/${cartItemId}`,
        config
      );
      console.log(response);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductFromCart = createAsyncThunk(
  "user/cart/update",
  async (cartDetail, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8070/user/update-product-from-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
        "",
        config
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "user/cart/ceate-order",
  async (orderDetail, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8070/user/order",
        orderDetail,
        config
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userOrders = createAsyncThunk(
  "user/get-order",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8070/user/order/get",
        config
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:8070/user/update",
        data.value,
        data.config2
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emptyCart = createAsyncThunk(
  "user/emptyCart",
  async (thunkAPI) => {
    try {
      const response = await axios.delete(
        "http://localhost:8070/user/empty-cart",
        config
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  // initialState: initialState,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createduser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created Succefully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        if (state.isSuccess === true) {
          localStorage.setItem("token", action.payload.token);
          toast.info("User Login Succefully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })

      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Fruit Added to Cart");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })

      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })

      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.removeCartProduct = action.payload;
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })

      .addCase(updateProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
      })
      .addCase(updateProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })

      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Ordered Succefully");
        }
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          // toast.error(action.error);
          toast.error("Something Went Wrong");
        }
      })

      .addCase(userOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userOrder = action.payload;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.userOrder = [];
        state.message = action.error;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if (state.isSuccess) {
          toast.success("Profile Updated Succefully");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          // toast.error(action.error);
          toast.error("Something Went Wrong");
        }
      })

      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.emptyUserCart = action.payload;
        // if (state.isSuccess) {
        //   toast.success("Profile Updated Succefully");
        // }
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.emptyUserCart = [];
        state.message = action.error;
        // if (state.isError === true) {
        //   // toast.error(action.error);
        //   toast.error("Something Went Wrong");
        // }
      });
  },
});

export default authSlice.reducer;
