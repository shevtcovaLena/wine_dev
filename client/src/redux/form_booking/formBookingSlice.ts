import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FormBookingStateType = {
    quantitySeats: number,
};

const initialState = {
    quantitySeats: 1,
};

const formBookingSlice = createSlice({
  name: 'formBookingSlice',
  initialState,
  reducers: {
    setQuantitySeats: (state, action: PayloadAction<number>) => {
        state.quantitySeats = action.payload;
      },
}
});

export default formBookingSlice.reducer;
export const {setQuantitySeats} = formBookingSlice.actions;