import { createSlice } from '@reduxjs/toolkit';
import { fetchTours } from './dateReservThunkActions';
import { ToursType } from '../ToursPage/toursTypes';



export type ToursStateType = {
  tours: ToursType; 
  toursDefault: ToursType;//Array<ITour>
  isLoading: boolean;
};
//мешочек начального состояния
const initialState: ToursStateType = {
  tours: [],
  toursDefault:[],
  isLoading: true,
};

const toursSlice = createSlice({
  name: 'toursSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTours.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTours.fulfilled, (state, { payload }) => {
      state.tours = payload; // payload это response.data из thunk
      state.toursDefault = payload;
      console.log('Default1',state.toursDefault)
      console.log('Tours2',state.tours)
      state.isLoading = false;
    });
    
  },
});

export default toursSlice.reducer;
// export const {filterTours} = toursSlice.actions;
