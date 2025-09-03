"use client";

import DeleteAccount from "@/components/deleteAccount";
import Notifications from "@/components/notifications";
import OrderTab from "@/components/orderTab";
import ProfileCard from "@/components/profileCard";
import { Button } from "@/components/ui/button";
import BillingSection from "@/components/userPayment";
import { WishListTab } from "@/components/wishListTab";
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
          <BillingSection activeTab={activeTab}/>
        )}
{activeTab === "notifications" && (
  <Notifications/>
)}

        {activeTab === "Delete Account" && (
       <DeleteAccount/>
        )}


      </main>
    </div>
  );
}
