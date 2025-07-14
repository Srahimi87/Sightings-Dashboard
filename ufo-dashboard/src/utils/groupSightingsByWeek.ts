import type { Sighting, WeekData } from '../features/sightings/types';
import { format } from 'date-fns';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function groupSightingsByWeek(
  sightings: Sighting[],
  startofweekDate: Date
): WeekData[] {
  const result: WeekData[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startofweekDate);
    currentDay.setDate(currentDay.getDate() + i);

    const datePresent = format(currentDay, 'dd/MM/yyyy');
    const PresentSighting = sightings.find(s => s.date === datePresent);
     
    //to be able to get all days of the week with I used push method and for loop  with ternanry operator
    result.push({
      day: daysOfWeek[i],
      sightings: PresentSighting ? PresentSighting.sightings : 0,
    });
  }

  return result;
}
