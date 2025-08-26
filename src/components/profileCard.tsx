"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
} from "@/components/ui/dialog"
import EditProfileForm from "@/components/editProfileForm";

const ProfileCard = () => {
  const { data: session } = useSession();
  const [editOpen ,setEditOpen] = useState<boolean>(false);

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={session?.user?.image ?? ""}
              alt={session?.user?.name ?? "User"}
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {session?.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-xl">{session?.user?.name}</CardTitle>
            <p className="text-gray-500">Kathmandu, Nepal</p>
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
  session={session} 
  setEditOpen={setEditOpen} 
/>

</Dialog>

      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p>{session?.user?.name || "Guest User"}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p>{session?.user?.email || "example@email.com"}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p>{(session?.user as any)?.phone || "+977 9800000000"}</p>
          </div>
          <div>
            <p className="text-gray-500">Default Address</p>
            <p>
              {(session?.user as any)?.defaultAddress || "Kathmandu, Nepal"}
            </p>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div>
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>
            {(session?.user as any)?.shippingAddress ||
              "Kathmandu, Nepal, 44600"}
          </p>
        </div>
      </CardContent>

    </Card>
  );
};

export default ProfileCard;
