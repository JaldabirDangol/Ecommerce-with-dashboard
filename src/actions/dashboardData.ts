import { prisma } from "@/lib/db";

export const DashboardData = async () => {
  try {
    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count();
    const totalProducts = await prisma.product.count();

    const totalSellsResult = await prisma.order.aggregate({
      _sum: { total: true },
    });
    const totalSells = totalSellsResult._sum.total || 0;

    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lt: 10 } }, 
      select: { id: true, name: true, stock: true ,price:true },
      take: 10, 
    });

    const recentActivities = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        total: true,
        user: { select: { name: true } },
        createdAt: true,
      },
      take: 5,
    });
  

   const sum =  [{
        totalOrders,
        totalCustomers,
        totalProducts,
        totalSells,
      },
      lowStockProducts,
      recentActivities,
   ]
    console.log(sum ,"sumsm sjdfnisfasdfgasdf")
    return {
      summary: {
        totalOrders,
        totalCustomers,
        totalProducts,
        totalSells,
      },
      lowStockProducts,
      recentActivities,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch dashboard data");
  }
};
