import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios";
import { base_url } from "../../../../Utils/Config";


export const addExpense = createAsyncThunk("expense/add", async(expenseData, thunkAPI) =>{
    try{
        const response = await axios.post(`${base_url}expense/add`, expenseData);
        if(response.data){
            return response.data;
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const expenseState = {
    sales:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""

}
export const expenseSlice = createSlice ({
    name: "expense",
    initialState: expenseState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addExpense.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(addExpense.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.expense = action.payload;
            if(state.isSuccess === true){
                toast.success("Expense Added");
            }
         
        })
        .addCase(addExpense.rejected,(state,action) =>{
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


export default expenseSlice.reducer;
