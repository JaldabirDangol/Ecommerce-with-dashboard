"use client";

import { Header } from "@/components/dashboard/header";
import { LeftSideBar } from "@/components/dashboard/leftSideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />

      <div className="flex flex-1">
        <LeftSideBar />

        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
