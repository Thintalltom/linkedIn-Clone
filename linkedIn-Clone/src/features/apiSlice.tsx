import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface UserState {
  isLoading: boolean;
  data: any; // Replace with more specific type if known
  error: boolean;
  postLoading: boolean;
  delLoading: boolean;
}

const initialState: UserState = {
  isLoading: false,
  data: null,
  error: false,
  postLoading: false,
  delLoading: false

};

interface Info {
  title: string,
  body: string;
  userId: number
}

const info: Info = {
  title: 'foo',
  body: 'bar',
  userId: 1

}
interface DelInfo {
  id: number

}

const delInfo: DelInfo = {
  id: 1
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data; // Access the data property of the response
});

export const postUser = createAsyncThunk('user/postUser', async () => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/users', info);
  return response.data
})

export const delUser = createAsyncThunk('user/delUser', async () => {
  const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${delInfo.id}`);
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    //code for the fetch user
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
    })

    // code for the postUser 
    builder.addCase(postUser.pending, (state) => {
      console.log('Post User pending'); 
      state.postLoading = true;
    })
    builder.addCase(postUser.fulfilled, (state, action) => {
      console.log('Post User fulfilled', action.payload);
      state.postLoading = false;
      if (state.data) {
        state.data = [...state.data, action.payload];
      } else {
        state.data = [action.payload];
      }
    })
   builder.addCase(postUser.rejected, (state, action) => {
    console.log('Post User rejected', action.error);  
    state.postLoading = false;
      state.error = true;
    });

    //code to delete data from the api

    builder.addCase(delUser.pending, (state) => {
      console.log('Delete User pending');
      state.delLoading = true;
    })
    builder.addCase(delUser.fulfilled, (state, action) => {
      console.log('Delete User fulfilled', action.payload);
      state.delLoading = false;
      if (state.data) {
        state.data = state.data.filter((user: any) => {user.id !== delInfo.id});
        console.log(state.data)
       
      }
      
    })  
    builder.addCase(delUser.rejected, (state, action) => {
      console.log('Delete User rejected', action.error);
      state.delLoading = false;
      state.error = true;
    });
  }
});

export default userSlice.reducer;
