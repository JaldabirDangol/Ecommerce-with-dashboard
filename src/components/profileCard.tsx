"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ProfileCard = () => {
  const { data: session } = useSession();
  const [editOpen ,setEditOpen] = useState<boolean>(false);

  const profileFields = [
  { key: "name", label: "Full Name", type: "text", defaultValue: session?.user?.name || "Guest User" },
  { key: "email", label: "Email", type: "email", defaultValue: session?.user?.email || "example@email.com" },
  { key: "phone", label: "Phone", type: "text", defaultValue: (session?.user as any)?.phone || "+977 9800000000" },
  { key: "defaultAddress", label: "Default Address", type: "text", defaultValue: (session?.user as any)?.defaultAddress || "Kathmandu, Nepal" },
]

 const [formData, setFormData] = useState({
  name: session?.user?.name || "",
  email: session?.user?.email || "",
  phone: (session?.user as any)?.phone || "",
  defaultAddress: (session?.user as any)?.defaultAddress || "",
  shippingAddress: (session?.user as any)?.shippingAddress || "",
});

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
            <CardTitle className="text-xl">Jaldabir Dangol</CardTitle>
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

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Update your profile information below.
      </DialogDescription>
    </DialogHeader>

  <div className="grid grid-cols-2 gap-4 text-sm mt-4">
  {profileFields.map((field) => (
    <div key={field.key}>
      <label className="text-gray-500">{field.label}</label>
      <input
        type={field.type}
        defaultValue={field.defaultValue}
        className="w-full border rounded px-2 py-1 mt-1"
        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
      />
    </div>
  ))}
</div>

    <hr className="my-4 border-t border-gray-200" />

    <div>
      <label className="font-semibold mb-2 block">Shipping Address</label>
      <input
        type="text"
        defaultValue={(session?.user as any)?.shippingAddress || "Kathmandu, Nepal, 44600"}
        className="w-full border rounded px-2 py-1 mt-1"
      />
    </div>

    <div className="mt-4 flex justify-end gap-2">
      <Button variant="outline" onClick={() => setEditOpen(false)}>
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </div>
  </DialogContent>
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
