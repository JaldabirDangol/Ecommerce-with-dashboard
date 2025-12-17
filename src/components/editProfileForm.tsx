"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AtSign, Home, User, Package } from "lucide-react";
import { useUserStore } from "@/store/userData";
import { SuccessUserData, updateUserData } from "@/actions/profile";

interface EditProfileFormProps {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddressFieldsProps {
  addressType: "defaultAddress" | "shippingAddress";
  formData: SuccessUserData;
  handleAddressChange: (
    addressType: "defaultAddress" | "shippingAddress",
    field: keyof NonNullable<SuccessUserData["defaultAddress"]>,
    value: string
  ) => void;
}

const EditProfileForm = ({ setEditOpen }: EditProfileFormProps) => {
  const user = useUserStore((state) => state.user) as SuccessUserData;
  const updateUserDataStore = useUserStore((state) => state.updateUserDataStore);


  const [formData, setFormData] = useState<SuccessUserData>({
    ...user,
    defaultAddress: user?.defaultAddress
      ? { ...user?.defaultAddress }
      : {
          id: "",
          userId: user?.id,
          street: "",
          city: "",
          postal: "",
          country: "",
          phone: "",
          createdAt: new Date(),
        },
    shippingAddress: user?.shippingAddress
      ? { ...user?.shippingAddress }
      : {
          id: "",
          userId: user?.id,
          street: "",
          city: "",
          postal: "",
          country: "",
          phone: "",
          createdAt: new Date(),
        },
  });

  const initialData = { error: undefined, success: undefined, message: "" };

  // Handle changes for personal info fields
  const handleChange = (field: keyof SuccessUserData, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (
    addressType: "defaultAddress" | "shippingAddress",
    field: keyof NonNullable<SuccessUserData["defaultAddress"]>,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const result = await updateUserData(initialData, formData);

    if (result.success && result.userData) {
      updateUserDataStore(result.userData);
      setEditOpen(false);
      toast(result.message);
    }
  };

  return (
    <DialogContent className="!max-w-5xl p-2 h-full bg-white dark:bg-gray-800 transition-colors duration-200">
      <DialogHeader>
        <DialogTitle className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="text-blue-600" size={28} />
          Edit Profile
        </DialogTitle>
        <DialogDescription className="text-gray-500 dark:text-gray-400 text-base mt-1">
          Update your personal details and address information below. All fields are optional.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Personal Information */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 w-full">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
            <User size={20} className="text-blue-600" />
            Personal Information
          </h3>

          <div className="space-y-4">
            <InputField
              id="fullName"
              icon={<User size={18} className="text-gray-400" />}
              label="Full Name"
              value={formData.name ?? ""}
              onChange={(val) => handleChange("name", val)}
            />
            <InputField
              id="email"
              icon={<AtSign size={18} className="text-gray-400" />}
              label="Email"
              value={formData.email ?? ""}
              readOnly
            />
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
        </div>

        {/* Addresses */}
        <div className="space-y-8">
          <AddressSection
            icon={<Home size={20} className="text-green-600" />}
            title="Default Address"
            addressType="defaultAddress"
            formData={formData}
            handleAddressChange={handleAddressChange}
          />
          <AddressSection
            icon={<Package size={20} className="text-purple-600" />}
            title="Shipping Address"
            addressType="shippingAddress"
            formData={formData}
            handleAddressChange={handleAddressChange}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default EditProfileForm;

/* ---------------- Input Field Component ---------------- */
interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

const InputField = ({ id, label, value, icon, readOnly, onChange }: InputFieldProps) => (
  <div>
    <label className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1" htmlFor={id}>
      {label}
    </label>
    <div className="relative">
      {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
      <input
        id={id}
        type="text"
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`w-full border rounded-lg px-3 py-2 ${icon ? "pl-10" : ""} ${
          readOnly
            ? "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        } transition-colors duration-200`}
      />
    </div>
  </div>
);

const AddressSection = ({
  icon,
  title,
  addressType,
  formData,
  handleAddressChange,
}: {
  icon: React.ReactNode;
  title: string;
  addressType: "defaultAddress" | "shippingAddress";
  formData: SuccessUserData;
  handleAddressChange: AddressFieldsProps["handleAddressChange"];
}) => {
  const fields = ["phone", "street", "city", "postal", "country"] as const;

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
        {icon} {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field} className={field === "country" ? "sm:col-span-2" : ""}>
            <label className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1" htmlFor={`${addressType}-${field}`}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={`${addressType}-${field}`}
              type="text"
              value={formData[addressType]?.[field] ?? ""}
              onChange={(e) => handleAddressChange(addressType, field, e.target.value)}
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
