import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"; 
import { auth } from "@/app/auth"; 

export async function GET(req: NextRequest) {
    const session = await auth();

  if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const notifications = await prisma.notification.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notifications);
}
