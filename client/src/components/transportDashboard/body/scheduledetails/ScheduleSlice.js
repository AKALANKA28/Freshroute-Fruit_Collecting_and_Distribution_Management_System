import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios";
import { base_url } from "../../../../Utils/Config";


export const addSchedule = createAsyncThunk("Schedule/add", async(ScheduleData, thunkAPI) =>{
    try{
        const response = await axios.post(`${base_url}Schedule/add`, ScheduleData);
        if(response.data){
            return response.data;
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const ScheduleState = {
    Schedule:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""

}
export const ScheduleSlice = createSlice ({
    name: "schedule",
    initialState: ScheduleState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addSchedule.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(addSchedule.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.Schedule = action.payload;
            if(state.isSuccess === true){
                toast.success("Schedule Added");
            }
         
        })
        .addCase(addSchedule.rejected,(state,action) =>{
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


export default ScheduleSlice.reducer;
