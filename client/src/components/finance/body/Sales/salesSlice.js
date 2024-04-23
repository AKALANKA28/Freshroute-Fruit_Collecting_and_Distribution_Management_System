import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios";
import { base_url } from "../../../../Utils/Config";


export const addSales = createAsyncThunk("sales/add", async(salesData, thunkAPI) =>{
    try{
        const response = await axios.post(`${base_url}sales/add`, salesData);
        if(response.data){
            return response.data;
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const salesState = {
    sales:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""

}
export const salesSlice = createSlice ({
    name: "sales",
    initialState: salesState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addSales.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(addSales.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.sales = action.payload;
            if(state.isSuccess === true){
                toast.success("Sales Added");
            }
         
        })
        .addCase(addSales.rejected,(state,action) =>{
            state.isLoading=false;
            state.isError = true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError === true){
                toast.error(action.error);
            }
        })

    }
})


export default salesSlice.reducer;
