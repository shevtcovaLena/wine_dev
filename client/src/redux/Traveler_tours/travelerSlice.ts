import { createSlice } from "@reduxjs/toolkit";
import { TravelerToursType } from "./travelerTourTypes";
import { fetchDeleteTour, fetchTravelerTours } from "./travelerThunkActions";

export type TravelerStateType ={
    travelerTours: TravelerToursType;
    isLoading: boolean;
}
//начальное состояние
const initialState = {
    travelerTours: [],
    isLoading:true,
}

const travelerSlice = createSlice({
name: 'travelerSlice',
initialState,
reducers:{

},
extraReducers:(builder) => {
builder.addCase(fetchTravelerTours.pending, (state) => {
state.isLoading = true;
});

builder.addCase(fetchTravelerTours.fulfilled,(state, {payload}) => {
state.travelerTours = payload;
state.isLoading = false;
}),
builder.addCase(fetchDeleteTour.fulfilled, (state, { payload }) => {
    state.travelerTours = state.travelerTours.filter((el) => el.id !== payload);
  });
},
});

export default travelerSlice.reducer;