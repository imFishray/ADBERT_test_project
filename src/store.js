import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import btcReducer from './btcSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    btc: btcReducer,
  },
});

export default store;
