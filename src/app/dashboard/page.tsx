import { DashboardCard } from "@/components/dashboard/dashboardCard";
import { EarningsChart } from "@/components/dashboard/earninigChart";
import { Header } from "@/components/dashboard/header";
import RecentActivity from "@/components/dashboard/recentActivity";
import { SalesTargetChart } from "@/components/dashboard/salesTargetChart";
import { UserHitRateChart } from "@/components/dashboard/userHitRate";
import {
  DollarSign,
  FileText,
  Users,
  Boxes,
} from "lucide-react";

 const sampleActivities = [
    {
      icon: { type: 'shoppingCart', bgClass: 'bg-green-500' },
      title: 'New item sold',
      description: 'Sonar Gabur Purchased Samsung Galaxy S20',
      timeAgo: '14 min ago',
    },
    {
      icon: { type: 'shoppingCart', bgClass: 'bg-green-500' },
      title: 'New item sold',
      description: 'Sonar Gabur Purchased Samsung Galaxy S20',
      timeAgo: '14 min ago',
    },
    {
      icon: { type: 'bell', bgClass: 'bg-blue-500' },
      title: 'New item sold',
      description: 'Sonar Gabur Purchased Samsung Galaxy S20',
      timeAgo: '14 min ago',
    },
  ];

const page = () => (
  <div className="flex flex-col gap-4">
    <Header />
    <div className="flex w-full justify-between">
      <DashboardCard
        title="Total Sales"
        icon={<DollarSign className="text-yellow-500" />}
        value="$76,96,432"
        trend="up" />
      <DashboardCard
        title="Total Order"
        icon={<FileText className="text-blue-400" />}
        value={1645}
        trend="up" />
      <DashboardCard
        title="Total Customer"
        icon={<Users className="text-purple-400" />}
        value={14634}
        trend="down" />
      <DashboardCard
        title="Total Products"
        icon={<Boxes className="text-green-400" />}
        value={254}
        trend="up" />
    </div>

    <div className="flex w-fulll gap-3 justify-between">
      <EarningsChart />
      <SalesTargetChart/>
     <RecentActivity activities={sampleActivities} />
    </div>

    <UserHitRateChart/>
  </div>

)

export default page;