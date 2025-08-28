"use client";

import OrderTab from "@/components/orderTab";
import ProfileCard from "@/components/profileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WishListTab } from "@/components/wishListTab";
import { Bell, CreditCard, Lock, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type TabType = "profile" | "orders" | "wishlist" | "billing" | "notifications"  | "Delete Account";

const tabs = ["profile" , "orders" , "wishlist" ,"billing" , "notifications" ,"Delete Account"]

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const tabFromUrl = (searchParams.get("tab") as TabType) || "profile";
   const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl);
   const router = useRouter()

 useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  return (
    <div className="flex max-w-7xl mx-auto py-10 px-4 gap-8">
<aside className="w-1/4">
  <ul className="space-y-2 text-sm">
    {tabs.map((item) => (
      <li key={item}>
        <Button
          variant={activeTab === item ? "secondary" : "ghost"}
          className={`w-full justify-start ${
            item === "Delete Account" ? "text-red-600" : ""
          }`}
      onClick={() => router.push(`/profile?tab=${item}`)}
        >
          {item}
        </Button>
      </li>
    ))}
  </ul>
</aside>

      <main className="flex-1">
        {activeTab === "profile" && (
          <ProfileCard/>
        )}

        {activeTab === "orders" && (
        <OrderTab/>
        )}

        {activeTab === "wishlist" && (
    <WishListTab/>
        )}

        {activeTab === "billing" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={18} /> Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Saved Card: **** **** **** 1234</p>
              <p>Payment Method: Visa</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "notifications" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={18} /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm">
                <li>Your order #1234 has been shipped</li>
                <li>New discount on laptops this week!</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {activeTab === "Delete Account" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Lock size={18} /> Account Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash size={16} /> Delete Account
              </Button>
            </CardContent>
          </Card>
        )}


      </main>
    </div>
  );
}
