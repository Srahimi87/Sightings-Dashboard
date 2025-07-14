import { configureStore } from '@reduxjs/toolkit';
import sightingsReducer from '../features/sightings/sightingsSlice';

export const store = configureStore({
  reducer: {
    sightings: sightingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
