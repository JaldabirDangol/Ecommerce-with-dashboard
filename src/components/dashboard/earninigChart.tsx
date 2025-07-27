"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', earn: 500 },
  { name: 'Feb', earn: 600 },
  { name: 'Mar', earn: 800 },
  { name: 'Apr', earn: 300 },
  { name: 'May', earn: 700 },
  { name: 'Jun', earn: 1000 },
];

export const EarningsChart = () => (
  <div className="bg-white rounded-xl p-4 shadow  w-1/3 h-93">
    <h2 className="text-md font-semibold mb-2">Earning Statistics</h2>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="earn" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
