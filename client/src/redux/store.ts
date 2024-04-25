import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import toursSlice, { ToursStateType } from "./ToursPage/toursSlice";
import userSlice, { UserStateType } from "./userSlice";
import travelerSlice, { TravelerStateType } from "./Traveler_tours/travelerSlice";
import ratingsSlice from "./ratingsSlice";

type StoreType = {
  toursSlice: ToursStateType;
  userSlice: UserStateType;
  travelerSlice: TravelerStateType;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    toursSlice,
    userSlice,
    travelerSlice,
    ratingsSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
