import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { ProcessedSighting } from "./sightingsSlice";
import type { WeekData } from "./types";

export const selectSightings = (state: RootState) => state.sightings.data;

export const selectCurrentWeekIndex = (state: RootState) =>
  state.sightings.currentWeekIndex;

export const selectWeeks = createSelector(
  [selectSightings],
  (data: ProcessedSighting[]) => {
    const seen = new Set<string>();
    const weeks: Date[] = [];

    data.forEach((sighting) => {
      const date = sighting.parsedDate;
      const day = date.getDay();

      const monday = new Date(date);
      monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

      const key = monday.toDateString();

      if (!seen.has(key)) {
        seen.add(key);
        weeks.push(monday);
      }
    });

    return weeks.sort((a, b) => a.getTime() - b.getTime());
  }
);

export const selectCurrentWeekData = createSelector(
  [selectSightings, selectWeeks, selectCurrentWeekIndex],
  (data: ProcessedSighting[], weeks, index): WeekData[] => {
    const currentWeek = weeks[index];
    if (!currentWeek) return [];

    const start = new Date(currentWeek);
    const end = new Date(currentWeek);
    end.setDate(start.getDate() + 6);

    const filtered = data.filter((sighting) => {
      const d = sighting.parsedDate;
      return d >= start && d <= end;
    });

    const result: Record<string, number> = {};

    filtered.forEach((item) => {
      const day = item.parsedDate.toLocaleDateString("en-GB", {
        weekday: "short",
      });

      result[day] = (result[day] || 0) + 1;
    });

    const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return order.map((day) => ({
      day,
      sightings: result[day] || 0,
    }));
  }
);