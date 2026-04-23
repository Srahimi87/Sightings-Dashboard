import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { parse } from "date-fns";
import { fetchSightings } from "./sightingsAPI";
import type { Sighting } from "./types";

export interface ProcessedSighting extends Sighting {
  parsedDate: Date;
}

interface SightingsState {
  data: ProcessedSighting[];
  loading: boolean;
  error: string | null;
  currentWeekIndex: number;
}

const initialState: SightingsState = {
  data: [],
  loading: false,
  error: null,
  currentWeekIndex: 0,
};

export const getSightings = createAsyncThunk(
  "sightings/getSightings",
  async () => {
    const response = await fetchSightings();

    return response.map((item: Sighting) => ({
      ...item,
      parsedDate: parse(item.date, "dd/MM/yyyy", new Date()),
    }));
  }
);

const sightingsSlice = createSlice({
  name: "sightings",
  initialState,
  reducers: {
    setNextWeek(state, action: PayloadAction<number>) {
      if (state.currentWeekIndex < action.payload - 1) {
        state.currentWeekIndex++;
      }
    },
    setPreviousWeek(state) {
      if (state.currentWeekIndex > 0) {
        state.currentWeekIndex--;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSightings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSightings.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.currentWeekIndex = 0;
      })
      .addCase(getSightings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching sightings";
      });
  },
});

export const { setNextWeek, setPreviousWeek } = sightingsSlice.actions;
export default sightingsSlice.reducer;