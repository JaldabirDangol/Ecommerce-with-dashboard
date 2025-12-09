"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2, AlertCircle } from "lucide-react";

type ChartData = {
  month: string;
  earn: number;
};

export const EarningsChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard/earning");
        if (!res.ok) throw new Error("Failed to fetch earnings");
        
        const { data: chartData } = await res.json();
        
        setData(chartData);
        
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        <span className="ml-2 text-gray-500">Loading chart...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-8 text-red-500">
        <AlertCircle className="h-10 w-10 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow w-1/3 h-96">
      <h2 className="text-md font-semibold mb-2">Earning Statistics</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="earn" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};