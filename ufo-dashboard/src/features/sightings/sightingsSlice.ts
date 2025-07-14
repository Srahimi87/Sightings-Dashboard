import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSightings } from './sightingsAPI';
import type { Sighting } from './types';

interface SightingsState {
  data: Sighting[];
  loading: boolean;
  error: string | null;
}

const initialState: SightingsState = {
  data: [],
  loading: false,
  error: null,
};

export const getSightings = createAsyncThunk('sightings/getSightings', fetchSightings);

const sightingsSlice = createSlice({
  name: 'sightings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSightings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSightings.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getSightings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching sightings';
      });
  },
});

export default sightingsSlice.reducer;
