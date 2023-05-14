import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    message: "",
    isLoading: false,
    isError: false,
    isSuccess: false
}

//Create new goal
export const setGoal = createAsyncThunk("goal/set",async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await goalService.setGoal(goalData, token);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const updateGoal = createAsyncThunk("goal/update", async (goal, thunkAPI) => {

})
export const getGoal = createAsyncThunk("goal/get",async () => {

});

export const deleteGoal = createAsyncThunk("goal/delete",async () => {

});

export const authSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {

    }
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;