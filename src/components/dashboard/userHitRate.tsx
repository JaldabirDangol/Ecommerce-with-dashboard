"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', value: 300 },
  { month: 'Feb', value: 500 },
  { month: 'Mar', value: 1000 },
  { month: 'Apr', value: 400 },
  { month: 'May', value: 800 },
  { month: 'Jun', value: 950 },
];

export const UserHitRateChart = () => (
  <div className="bg-white rounded-xl px-4 py-6 shadow w-full h-92 ">
    <h2 className="text-md font-semibold mb-2">User Hit Rate</h2>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
