import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import toursSlice, { ToursStateType } from "./ToursPage/toursSlice";
import userSlice, { UserStateType } from "./userSlice";
import travelerSlice, { TravelerStateType } from "./Traveler_tours/travelerSlice";
// import ratingsSlice from "./ratingsSlice";
import formBookingSlice, { FormBookingStateType } from "./form_booking/formBookingSlice";

type StoreType = {
  toursSlice: ToursStateType;
  userSlice: UserStateType;
  travelerSlice: TravelerStateType;
  // ratingsSlice: ,
  formBookingSlice: FormBookingStateType;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    toursSlice,
    userSlice,
    travelerSlice,
    // ratingsSlice,
    formBookingSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
