import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 請將 YOUR_API_KEY 替換成你在 apilayer 取得的 key
const API_KEY = 'lrSCPswKDGeqPeIkwNTxfLaQMoxRh9d9';
const API_URL = `https://api.apilayer.com/exchangerates_data/latest`;

export const fetchRates = async () => {
  const res = await fetch(API_URL, {
    headers: { apikey: API_KEY },
  });
  if (!res.ok) throw new Error('API error');
  return res.json();
};

export const getRates = createAsyncThunk('btc/getRates', async () => {
  return await fetchRates();
});

const btcSlice = createSlice({
  name: 'btc',
  initialState: { data: {}, loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(getRates.pending, state => { state.loading = true; state.error = null; })
      .addCase(getRates.fulfilled, (state, action) => { state.data = action.payload; state.loading = false; })
      .addCase(getRates.rejected, (state, action) => { state.error = action.error.message; state.loading = false; });
  }
});

export default btcSlice.reducer;
