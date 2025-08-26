"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Session } from "next-auth";
import { updateUserData } from "@/actions/profile";
import { toast } from "sonner";

interface EditProfileFormProps {
  session: Session | null;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  defaultAddress: string;
  shippingAddress: string;
}

const EditProfileForm = ({ session, setEditOpen }: EditProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: (session?.user)?.phone || "",
    defaultAddress: (session?.user)?.defaultAddress || "",
    shippingAddress: (session?.user)?.shippingAddress || "",
  });

  const profileFields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "defaultAddress", label: "Default Address", type: "text" },
  ];

  const initialData = { error: undefined, success: undefined, message: "" };

  const handleSave = async () => {
    const result = await updateUserData(initialData, formData);
    if (result.success) {
      setEditOpen(false);
      toast(result?.message);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>Update your profile information below.</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        {profileFields.map((field) => (
          <div key={field.key}>
            <label className="text-gray-500">{field.label}</label>
            <input
              type={field.type}
              value={formData[field.key as keyof ProfileFormData]}
              className="w-full border rounded px-2 py-1 mt-1"
              onChange={(e) =>
                setFormData({ ...formData, [field.key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <hr className="my-4 border-t border-gray-200" />

      <div>
        <label className="font-semibold mb-2 block">Shipping Address</label>
        <input
          type="text"
          value={formData.shippingAddress}
          className="w-full border rounded px-2 py-1 mt-1"
          onChange={(e) =>
            setFormData({ ...formData, shippingAddress: e.target.value })
          }
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={() => setEditOpen(false)}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </div>
    </DialogContent>
  );
};

export default EditProfileForm;