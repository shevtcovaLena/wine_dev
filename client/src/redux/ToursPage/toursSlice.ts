import { createSlice } from '@reduxjs/toolkit';
import { fetchTourAllow, fetchTourCancel, fetchTours } from './toursThunkActions';
import { ITour, ToursType } from './toursTypes'


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
  reducers: {
    filterTours(state, action) {
    
    state.tours = action.payload.toursDefault.filter((tour: ITour) => {
      //проверка региона
    const isRegionTour = action.payload.values.region ? tour.region === action.payload.values.region : true;

    const isPriceTour = action.payload.values.priceRangeMin !== undefined || action.payload.values.priceRangeMax !== undefined 
    ? tour.price >= action.payload.values.priceRangeMin || tour.price <= action.payload.values.priceRangeMax
    : true;

    const isDayTour = action.payload.values.duration ? tour.length_days >= action.payload.values.duration[0] && tour.length_days <= action.payload.values.duration[1]
    : true;

    return isRegionTour && isPriceTour && isDayTour;
    }
    //  { return tour.region === action.payload?.values.region}
    )
    }
    //фильтрация и к обычному состоянию
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTours.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTours.fulfilled, (state, { payload }) => {
      state.tours = payload as ToursType; // payload это response.data из thunk
      state.toursDefault = payload as ToursType;
      state.isLoading = false;
    });
    builder.addCase(fetchTourCancel.fulfilled, (state, { payload }) => {
      if (payload) {
        state.toursDefault = state.toursDefault.map((tour) => {
          if (tour.id === payload) {
            tour.status = 'canceled';
            return tour
          }
          return tour
        });
        // TODO Спросить не помешает ли на других страницах
        state.tours = state.tours.map((tour) => {
          if (tour.id === payload) {
            tour.status = 'canceled';
            return tour
          }
          return tour
        });        
      }
    });
    builder.addCase(fetchTourAllow.fulfilled, (state, { payload }) => {
      if (payload) {
        state.toursDefault = state.toursDefault.map((tour: ITour) => {
          if (tour.id === payload) {
            tour.status = 'allowed';
            return tour
          }
          return tour
        });
        // TODO Спросить не помешает ли на других страницах
        state.tours = state.tours.map((tour) => {
          if (tour.id === payload) {
            tour.status = 'allowed';
            return tour
          }
          return tour
        });        
      }
    });
    // builder.addCase(fetchFilterPost.fullfilled,(state, { payload }) => {})
  },
});

export default toursSlice.reducer;
export const {filterTours} = toursSlice.actions;
