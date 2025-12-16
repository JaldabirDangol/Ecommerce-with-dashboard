"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import EditProfileForm from "@/components/editProfileForm";
import { initialUserData, SuccessUserData } from "@/actions/profile";
import { useUserStore } from "@/store/userData";

const getField = (value?: string | null, fallback = "N/A") => value ?? fallback;

const ProfileCard = () => {
  const { data: session } = useSession();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<SuccessUserData | null>(null);

  const updateUserDataStore = useUserStore((state) => state.updateUserDataStore);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id) return;

      const res = await initialUserData();

      if ("status" in res && res.status === "error") {
        console.error("User data error:", res.error);
        return;
      }
 const userSuccess = res as SuccessUserData;

      setUserData(userSuccess);
      updateUserDataStore(userSuccess);
    };

    fetchUserData();
  }, [session, updateUserDataStore]);

  const defaultAddress = userData?.defaultAddress;
  const shippingAddress = userData?.shippingAddress;

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userData?.image ?? ""} alt={userData?.name ?? "User"} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {userData?.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-xl">{userData?.name ?? "Guest User"}</CardTitle>
            <p className="text-gray-500">
              {getField(defaultAddress?.city, "Kathmandu")},{" "}
              {getField(defaultAddress?.country, "Nepal")}
            </p>
          </div>
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <Button
            variant="outline"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2"
          >
            <Pencil size={16} /> Edit
          </Button>
          <EditProfileForm setEditOpen={setEditOpen} />
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p>{userData?.name ?? "Guest User"}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p>{userData?.email ?? "example@email.com"}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p>{getField(defaultAddress?.phone, "+977 9800000000")}</p>
          </div>
          <div>
            <p className="text-gray-500">Default Address</p>
            <p>
              {getField(defaultAddress?.street, "No street provided")} <br />
              {getField(defaultAddress?.city, "No city")},{" "}
              {getField(defaultAddress?.postal, "No postal code")}
              <br />
              {getField(defaultAddress?.country, "No country")}
            </p>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div>
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>
            {getField(shippingAddress?.street, "No street provided")}
            <br />
            {getField(shippingAddress?.city, "No city")},{" "}
            {getField(shippingAddress?.postal, "No postal code")}
            <br />
            {getField(shippingAddress?.country, "No country")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
