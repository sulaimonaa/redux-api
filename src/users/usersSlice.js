import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (rejectWithValue) => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=5');
      const data = await response.json();
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        const { results } = action.payload;
        let users = [];
        results.forEach((element) => {
          const {
            name: { first, last },
            login: { uuid },
          } = element;
          users.push({ first, last, uuid });
        });
        state.data = users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
