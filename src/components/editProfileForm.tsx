"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { updateUserData } from "@/actions/profile";
import { toast } from "sonner";
import { ProfileFormData } from "@/types/profileFormData";
import { AtSign, Home, User, Package } from "lucide-react";

interface EditProfileFormProps {
  user: ProfileFormData | null;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
 
}

const EditProfileForm = ({ user, setEditOpen  }: EditProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    defaultAddress: {
      street: user?.defaultAddress?.street || "",
      city: user?.defaultAddress?.city || "",
      postal: user?.defaultAddress?.postal || "",
      country: user?.defaultAddress?.country || "",
      phone: user?.defaultAddress?.phone || "",
    },
    shippingAddress: {
      street: user?.shippingAddress?.street || "",
      city: user?.shippingAddress?.city || "",
      postal: user?.shippingAddress?.postal || "",
      country: user?.shippingAddress?.country || "",
      phone: user?.shippingAddress?.phone || "",
    },
  });

  const initialData = { error: undefined, success: undefined, message: "" };

  const handleAddressChange = (
    addressType: "defaultAddress" | "shippingAddress",
    field: string,
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const result = await updateUserData(initialData, formData);
    if (result.success) {
      setEditOpen(false);
      toast(result?.message);
    }
  };

  return (
    <DialogContent className={`!max-w-5xl bg-white dark:bg-gray-800 transition-colors duration-200`}>
      <DialogHeader className="mb-6">
        <DialogTitle className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="text-blue-600" size={28} />
          Edit Profile
        </DialogTitle>
        <DialogDescription className="text-gray-500 dark:text-gray-400 text-base mt-1">
          Update your personal details and address information below. All fields
          are optional.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 w-full">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
            <User size={20} className="text-blue-600" />
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <label
                className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={formData.name || ""}
                  className="w-full border rounded-lg px-3 py-2 pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label
                className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  className="w-full border rounded-lg px-3 py-2 pl-10 bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

  
        <div className="space-y-8 ">
        
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
              <Home size={20} className="text-green-600" />
              Default Address
            </h3>
            <AddressFields
              addressType="defaultAddress"
              formData={formData}
              handleAddressChange={handleAddressChange}
            />
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
              <Package size={20} className="text-purple-600" />
              Shipping Address
            </h3>
            <AddressFields
              addressType="shippingAddress"
              formData={formData}
              handleAddressChange={handleAddressChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3 border-t pt-6">
        <Button
          variant="outline"
          onClick={() => setEditOpen(false)}
          className="px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
        >
          Save
        </Button>
      </div>
    </DialogContent>
  );
};

export default EditProfileForm;

// Reusable component for address fields to avoid repetition
const AddressFields = ({ addressType, formData, handleAddressChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label
        className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
        htmlFor={`${addressType}-phone`}
      >
        Phone
      </label>
      <input
        id={`${addressType}-phone`}
        type="text"
        value={formData[addressType]?.phone || ""}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        onChange={(e) => handleAddressChange(addressType, "phone", e.target.value)}
      />
    </div>
    <div>
      <label
        className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
        htmlFor={`${addressType}-street`}
      >
        Street
      </label>
      <input
        id={`${addressType}-street`}
        type="text"
        value={formData[addressType]?.street || ""}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        onChange={(e) => handleAddressChange(addressType, "street", e.target.value)}
      />
    </div>
    <div>
      <label
        className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
        htmlFor={`${addressType}-city`}
      >
        City
      </label>
      <input
        id={`${addressType}-city`}
        type="text"
        value={formData[addressType]?.city || ""}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        onChange={(e) => handleAddressChange(addressType, "city", e.target.value)}
      />
    </div>
    <div>
      <label
        className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
        htmlFor={`${addressType}-postal`}
      >
        Postal Code
      </label>
      <input
        id={`${addressType}-postal`}
        type="text"
        value={formData[addressType]?.postal || ""}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        onChange={(e) => handleAddressChange(addressType, "postal", e.target.value)}
      />
    </div>
    <div className="sm:col-span-2">
      <label
        className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
        htmlFor={`${addressType}-country`}
      >
        Country
      </label>
      <input
        id={`${addressType}-country`}
        type="text"
        value={formData[addressType]?.country || ""}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        onChange={(e) => handleAddressChange(addressType, "country", e.target.value)}
      />
    </div>
  </div>
);