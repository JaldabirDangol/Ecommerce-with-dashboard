import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
          lte: now,
        },
      },
    });

    const monthlyEarnings = new Map();

    const monthsArray = Array.from({ length: 6 }, (_, i) => {
      const monthDate = new Date();
      monthDate.setMonth(sixMonthsAgo.getMonth() + i);
      return monthDate.toLocaleString("default", { month: "short" });
    });

    orders.forEach(order => {
      const monthLabel = order.createdAt.toLocaleString("default", { month: "short" });
      const currentTotal = monthlyEarnings.get(monthLabel) || 0;
      monthlyEarnings.set(monthLabel, currentTotal + (order.total || 0));
    });

    const chartData = monthsArray.map(month => ({
      month: month,
      earn: monthlyEarnings.get(month) || 0,
    }));
   
    console.log(chartData,"charrtagasdfgasbdgfkjasdbfkg")
    return NextResponse.json({ data: chartData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 });
  }
}