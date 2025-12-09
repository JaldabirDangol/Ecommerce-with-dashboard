"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import EditProfileForm from "@/components/editProfileForm";
import { initialUserData } from "@/actions/profile";
import { useUserStore } from "@/store/userData";
import { User } from "@prisma/client";

 type initialUserDataType = User & {
  defaultAddress: {
    id: string;
    createdAt: Date;
    userId: string;
    street: string | null;
    city: string | null;
    postal: string | null;
    country: string | null;
    phone: string | null;
  } | null;

  shippingAddress: {
    id: string;
    createdAt: Date;
    userId: string;
    street: string | null;
    city: string | null;
    postal: string | null;
    country: string | null;
    phone: string | null;
  } | null;
};
const ProfileCard = () => {
  const { data: session } = useSession();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<initialUserDataType | null>(null);
   const updateUserDataStore = useUserStore((state)=>state.updateUserDataStore)

useEffect(() => {
  const fetchUserData = async () => {
    if (session?.user?.id) {
      const res = await initialUserData();

      if ("error" in res) {
        console.log("User data error:", res.error);
        return;
      }

      setUserData(res);
      updateUserDataStore(res);
      console.log("Updated userdata:", res);
    }
  };

  fetchUserData();
}, [session, updateUserDataStore]);


  const user = userData;

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={user?.image ?? ""}
              alt={user?.name ?? "User"}
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-xl">{user?.name}</CardTitle>
            <p className="text-gray-500">{user?.defaultAddress?.city || "Kathmandu"}, {user?.defaultAddress?.country || "Nepal"}</p>
          </div>
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <Button
            variant="outline"
            onClick={() => setEditOpen(!editOpen)}
            className="flex items-center gap-2"
          >
            <Pencil size={16} /> Edit
          </Button>
          <EditProfileForm 
            setEditOpen={setEditOpen}
          />
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p>{user?.name || "Guest User"}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p>{user?.email || "example@email.com"}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p>{user?.defaultAddress?.phone || "+977 9800000000"}</p>
          </div>
          <div>
            <p className="text-gray-500">Default Address</p>
            <p>
              {user?.defaultAddress?.street || "No street provided"}
              <br />
              {user?.defaultAddress?.city || "No city provided"}, {user?.defaultAddress?.postal || "No postal code"}
              <br />
              {user?.defaultAddress?.country || "No country provided"}
            </p>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div>
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>
            {user?.shippingAddress?.street || "No street provided"}
            <br />
            {user?.shippingAddress?.city || "No city provided"}, {user?.shippingAddress?.postal || "No postal code"}
            <br />
            {user?.shippingAddress?.country || "No country provided"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
