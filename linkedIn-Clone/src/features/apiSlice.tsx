import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  isLoading: boolean;
  data: any; // Replace with more specific type if known
  error: boolean;
}

const initialState: UserState = {
  isLoading: false,
  data: null,
  error: false
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data; // Access the data property of the response
});

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  }
});

export default userSlice.reducer;
