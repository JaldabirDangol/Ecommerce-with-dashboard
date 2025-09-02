import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
  );
}
