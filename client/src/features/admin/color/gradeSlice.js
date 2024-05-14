import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import gradeService from "./gradeService";


export const getGrades = createAsyncThunk(
  "grade/",
  async (thunkApi) => {
    try {
      return await gradeService.fetchGrade()
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createGrades = createAsyncThunk(
  "grade/add",
  async (gradeData, thunkApi) => {
    try {
      return await gradeService.createGrade(gradeData)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getGradeById = createAsyncThunk(
  "grade/getgrade",
  async (gradeId, thunkApi) => {
    try {
      return await gradeService.getGradeById(gradeId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateGrade = createAsyncThunk(
  "grade/updategrade",
  async (grade, thunkApi) => {
    try {
      return await gradeService.updateAGrade(grade)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteGrade = createAsyncThunk(
  "grade/deletegrade",
  async (gradeId, thunkApi) => {
    try {
      return await gradeService.deleteAGrade(gradeId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all")

const initialstate = {
  grades: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


const gradeSlice = createSlice({
  name: "users",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.grades = action.payload;
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.grades = [];
        state.message = action.error.message;
      })
      .addCase(createGrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGrades.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdGrade = action.payload;
      })
      .addCase(createGrades.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdGrade = [];
        state.message = action.error.message;
      })
      .addCase(getGradeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGradeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.gradeName = action.payload.title;
      })
      .addCase(getGradeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.gradeName = [];
        state.message = action.error.message;
      })
      .addCase(updateGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedGrade = action.payload;
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updatedGrade = [];
        state.message = action.error.message;
      })
      .addCase(deleteGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedGrade = action.payload;
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deletedGrade = [];
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialstate)
  },
});

export default gradeSlice.reducer;