import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { WeekData } from '../features/sightings/types';

interface Props {
  data: WeekData[];
}

const SightingsChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-gray-200 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Sightings for This Week</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickMargin={14} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sightings" fill="#82ca9d"  />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SightingsChart;
