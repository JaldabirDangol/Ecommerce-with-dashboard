import { DashboardCard } from "@/components/dashboard/dashboardCard";
import { EarningsChart } from "@/components/dashboard/earninigChart";
import LowStockProducts from "@/components/dashboard/lowStockProducts";
import RecentActivity from "@/components/dashboard/recentActivity";
import { SalesTargetChart } from "@/components/dashboard/salesTargetChart";
import { UserHitRateChart } from "@/components/dashboard/userHitRate";
import { DollarSign, FileText, Users, Boxes } from "lucide-react";
import { DashboardData } from "@/actions/dashboardData";

const DashboardPage = async () => {
  const data = await DashboardData();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex flex-col gap-4 py-4">
        <div className="flex w-full justify-between">
          <DashboardCard
            title="Total Sales"
            icon={<DollarSign className="text-yellow-500 w-10 h-10" />}
            value={`$${data.summary.totalSells.toLocaleString()}`}
            trend="up"
          />
          <DashboardCard
            title="Total Orders"
            icon={<FileText className="text-blue-400 w-10 h-10" />}
            value={data.summary.totalOrders}
            trend="up"
          />
          <DashboardCard
            title="Total Customers"
            icon={<Users className="text-purple-400 w-10 h-10" />}
            value={data.summary.totalCustomers}
            trend="down"
          />
          <DashboardCard
            title="Total Products"
            icon={<Boxes className="text-green-400 w-10 h-10" />}
            value={data.summary.totalProducts}
            trend="up"
          />
        </div>

        <div className="flex w-full gap-3 justify-between">
          <EarningsChart  />
          <SalesTargetChart  />
          <LowStockProducts products={data.lowStockProducts} />
        </div>

        <div className="flex w-full gap-3 justify-between">
          <UserHitRateChart  />
          <RecentActivity recentActivities={data.recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
