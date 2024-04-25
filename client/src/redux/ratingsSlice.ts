import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    rateTour(state, action) {
      const { userId, tourId, rating } = action.payload;
      if (!state[tourId]) {
        state[tourId] = {};
      }
      state[tourId][userId] = rating;
    },
  },
});

export const { rateTour } = ratingsSlice.actions;

export default ratingsSlice.reducer;