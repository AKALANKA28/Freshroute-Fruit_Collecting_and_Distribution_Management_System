import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios";
import { base_url, config } from "../../Utils/Config";


export const registerUser = createAsyncThunk("user/register", async(userData, thunkAPI) =>{
    try{
        const response = await axios.post("http://localhost:8070/user/register", userData);
        if (response.data){
            if (response.data) {
              localStorage.setItem("customer", JSON.stringify(response.data));
        }
        return response.data
      }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})


export const loginUser = createAsyncThunk("user/login", async(userData, thunkAPI) =>{
    try{
        const response = await axios.post("http://localhost:8070/user/login", userData);
        if(response.data){
            return response.data;
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})


export const getCustomerFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer"))
: null;

console.log(getCustomerFromLocalStorage);
export const addToCart = createAsyncThunk("user/cart/add", async(cartData, thunkAPI) =>{
    try{
        const response = await axios.post(`${base_url}user/cart`, cartData, config);
        if(response.data){
            return response.data;
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""

}
export const authSlice = createSlice ({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(registerUser.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(registerUser.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.createduser = action.payload;
            if(state.isSuccess === true){
                toast.info("User Created Succefully")
            }
        })
        .addCase(registerUser.rejected,(state,action) =>{
            state.isLoading=false;
            state.isError = true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError === true){
                toast.error(action.error);
            }
        })



        .addCase(loginUser.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(loginUser.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.user = action.payload;
            if(state.isSuccess === true){
                localStorage.setItem("token", action.payload.token);
                toast.info("User Login Succefully")
            }
        })
        .addCase(loginUser.rejected,(state,action) =>{
            state.isLoading=false;
            state.isError = true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError === true){
                toast.error(action.error);
            }
        })


        .addCase(addToCart.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(addToCart.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.cartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Fruit Added to Cart")
            }
        })
        .addCase(addToCart.rejected,(state,action) =>{
            state.isLoading=false;
            state.isError = true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError === true){
                toast.error(action.error);
            }
        });




    }
})


export default authSlice.reducer;
