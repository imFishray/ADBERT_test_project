import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 共用 API function
export const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('API error');
  return res.json();
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  return await fetchPosts();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { data: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => { state.loading = true; state.error = null; })
      .addCase(getPosts.fulfilled, (state, action) => { state.data = action.payload; state.loading = false; })
      .addCase(getPosts.rejected, (state, action) => { state.error = action.error.message; state.loading = false; });
  }
});

export default postsSlice.reducer;
