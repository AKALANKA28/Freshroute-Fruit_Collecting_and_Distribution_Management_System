import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios";


export const createQuery = createAsyncThunk("contact/post", async(contactData, thunkAPI) =>{
    try{
        const response = await axios.post("http://localhost:8070/enq/add", contactData);
        if(response.data){
            return response.data;
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const contactState = {
    contact:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""

}
export const contactSlice = createSlice ({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(createQuery.pending, (state) =>{
            state.isLoading=true
        })
        .addCase(createQuery.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess =true;
            state.contact = action.payload;
            if(state.isSuccess === true){
                toast.success("Submited Successfully");
            }
         
        })
        .addCase(createQuery.rejected,(state,action) =>{
            state.isLoading=false;
            state.isError = true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError === true){
                toast.error("Somthing went wrong");
            }
        });
    }
})


export default contactSlice.reducer;
