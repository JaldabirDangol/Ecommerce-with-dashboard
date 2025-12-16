"use client"
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'; 

const data = [
  { name: 'Monthly Target', value: 14500, fill: '#00C49F' },
  { name: 'Daily Target', value: 1290, fill: '#8884d8' }
];

export const SalesTargetChart = () => (
  <div className="bg-white rounded-xl p-4 shadow w-1/3 h-93">
    <h2 className="text-md font-semibold mb-2">Sales Target</h2>
    <ResponsiveContainer width="100%" height="65%">
        <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={data}
            startAngle={90} 
            endAngle={-270}
        >
            <RadialBar
        label={{ position: 'insideStart', fill: '#fff' }}
                dataKey="value"
            />
        
        </RadialBarChart>
    </ResponsiveContainer>

 
    <div className='w-full flex gap-2 mt-2'>
        <div className='flex flex-col gap-2'>
            <p><span className='w-2 h-2 rounded-3xl bg-gray-200'/> Daily Target</p>
            <p className='text-xl'>
                ↑ 1960
            </p>
        </div>

        <div className='flex flex-col gap-2'>
           
            <p><span className='w-2 h-2 rounded-3xl bg-gray-200'/> Monthly Target</p>
            <p className='text-xl'>
                ↑ 1960 
            </p>
        </div>
    </div>
  </div>
);