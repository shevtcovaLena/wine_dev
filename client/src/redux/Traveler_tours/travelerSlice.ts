import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TravelerToursType } from "./travelerTourTypes";
import { fetchDeleteTour, fetchTravelerTours } from "./travelerThunkActions";

export type TravelerStateType = {
  travelerTours: TravelerToursType;
  isLoading: boolean;
};
//начальное состояние
const initialState:TravelerStateType = {
  travelerTours: [],
  isLoading: true,
};

const travelerSlice = createSlice({
  name: "travelerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTravelerTours.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchTravelerTours.fulfilled, (state, action: PayloadAction<TravelerToursType>) => {
      state.travelerTours = action.payload;
      state.isLoading = false;
    }),
      builder.addCase(fetchDeleteTour.fulfilled, (state, { payload }) => {
        state.travelerTours = state.travelerTours.filter(
          (el) => el.id !== payload
        );
      });
  },
});

export default travelerSlice.reducer;
