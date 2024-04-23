import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios";
import { base_url } from "../../../../Utils/Config";


export const addProcess = createAsyncThunk("Process/add", async(ProcessData, thunkAPI) =>{
    try{
        const response = await axios.post(`${base_url}Process/add`, ProcessData);
        if(response.data){
            return response.data;
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const ProcessState = {
    Process:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""

}
export const ProcessSlice = createSlice ({
    name: "process",
    initialState: ProcessState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addProcess.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(addProcess.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.Process = action.payload;
            if(state.isSuccess === true){
                toast.success("Process Added");
            }
         
        })
        .addCase(addProcess.rejected,(state,action) =>{
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


export default ProcessSlice.reducer;
