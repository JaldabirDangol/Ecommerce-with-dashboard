
import { ProfileFormData } from "@/types/profileFormData";

interface AddressFieldsProps {
  addressType: "defaultAddress" | "shippingAddress";
  formData: ProfileFormData;
  handleAddressChange: (addressType: "defaultAddress" | "shippingAddress", field: string, value: string) => void;
}

export const AddressFields = ({ addressType, formData, handleAddressChange }: AddressFieldsProps) => {
  const fields = [
    { name: "phone", label: "Phone" },
    { name: "street", label: "Street" },
    { name: "city", label: "City" },
    { name: "postal", label: "Postal Code" },
    { name: "country", label: "Country" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.name} className={field.name === "country" ? "sm:col-span-2" : ""}>
          <label
            className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-1"
            htmlFor={`${addressType}-${field.name}`}
          >
            {field.label}
          </label>
          <input
            id={`${addressType}-${field.name}`}
            type="text"
            value={formData[addressType]?.[field.name as keyof typeof formData.defaultAddress] || ""}
            className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            onChange={(e) => handleAddressChange(addressType, field.name, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};