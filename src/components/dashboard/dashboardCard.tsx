import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  value: string | number;
  trend: "up" | "down";
  trendColor?: string;
}

export const DashboardCard = ({
  title,
  subtitle = "Last 30 days",
  icon,
  value,
  trend,
}: DashboardCardProps) => {
  return (
    <div className="flex flex-col p-4 rounded-xl shadow bg-white gap-4
     w-full max-w-[250px]">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text- font-medium text-gray-500">{title}</h4>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="text-xl">{icon}</div>
      </div>

      <div className="flex items-center gap-2 text-xl font-bold">
        <span
          className={`${
            trend === "up" ? "text-green-500 text-xl font-bold" : "text-red-500 text-xl font-bold"
          } text-base`}
        >
          {trend === "up" ? "↑" : "↓"}
        </span>
        <span>{value}</span>
      </div>
    </div>
  );
};
