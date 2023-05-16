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

//Update user goal
export const updateGoal = createAsyncThunk("goal/update", async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.updateGoal(goalData, token);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getGoals = createAsyncThunk("goal/getAll",async (_,thunkAPI) => {
    let token;
    try {
        token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//Delete User Goal
export const deleteGoal = createAsyncThunk("goal/delete",async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(goalId, token);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const authSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(setGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.goals.push(action.payload)
        })
        .addCase(setGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload; 
        })
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.goals = action.payload;
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload; 
        })
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.goals = state.goals.filter ((goal) => goal._id !== action.payload.id)
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload; 
        })
        .addCase(updateGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;         

            state.goals = state.goals.map ((goal) => {
                if (goal._id  === action.payload._id) { 
                    return action.payload
                } else {   
                    return goal
                }
            })
        })
        .addCase(updateGoal.rejected, (state, action) => {
            state.isLoading = false;    
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload; 
        })
    }
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;