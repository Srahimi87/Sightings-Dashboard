import {  format } from 'date-fns';
import type { Sighting } from './types';

interface RawSighting {
  date: string; 
  sightings: number;
}

export async function fetchSightings(): Promise<Sighting[]> {
  const response = await fetch(
    'https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings'
  );
  if (!response.ok) throw new Error('Failed to fetch sightings');

  const raw: RawSighting[] = await response.json();

  return raw.map(item => {
    const [day, month, year] = item.date.split('/');
    const parsed = new Date(Number(year), Number(month) - 1, Number(day)); 
    return {
      date: format(parsed, 'dd/MM/yyyy'),
      sightings: item.sightings,
    };
  });
}