"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/uploadImage";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(1, "Price must be at least 1"),
  stock: z.number().min(1, "Stock must be minimum 1"),
  brand: z.string().min(2, "Brand name must be longer than 2 letters").optional(),
  warrenty: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  material: z.string().optional(),
  images: z.array(z.string().url("Must be a valid URL")).nonempty("At least one image is required"),
  colorOptions: z.array(z.string().min(1, "Color option cannot be empty")).optional(),
  id: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

const formField = [
            { id: "name", label: "Name", type: "text", placeholder: "e.g., Laptop Pro" },
            { id: "brand", label: "Brand", type: "text", placeholder: "e.g Apple" },
            { id: "price", label: "Price", type: "number", placeholder: "e.g., 999.99", step: "0.01" },
            { id: "stock", label: "Stock", type: "number", placeholder: "e.g., 50" },
            { id: "warrenty", label: "Warrenty", type: "text", placeholder: "e.g 1 year" },
            { id: "dimensions", label: "Dimensions", type: "text", placeholder: "e.g 15x10x2 inches" },
            { id: "weight", label: "Weight", type: "text", placeholder: "e.g 1.5 kg" },
            { id: "material", label: "Material", type: "text", placeholder: "e.g Aluminum" },
          ]
const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      price: 1,
      stock: 1,
      id: undefined,
      images: [],
      warrenty: "",
      material: "",
      colorOptions: [],
      dimensions: "",
      weight: "",
      category: "",
    },
  });

  function submitHandler(values: ProductFormValues) {
    console.log("Form submitted with values:", values);
  }

  return (
    <div className="w-full h-full flex justify-center items-center px-6">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl bg-white p-8 rounded-xl shadow-md border border-gray-200"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {formField.map(({ id, label, type, placeholder, step }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={id}
                type={type}
                step={step}
                placeholder={placeholder}
                {...register(id as keyof ProductFormValues, { valueAsNumber: type === "number" })}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
              />
              {errors[id as keyof ProductFormValues] && (
                <p className="text-red-500 text-xs mt-1">
                  {(errors[id as keyof ProductFormValues]?.message as string) || ""}
                </p>
              )}
            </div>
          ))}

        </div>

        {/* Right Column */}
        <div className="flex flex-col  gap-2">
          
          <div className="flex gap-4 flex-col items-start">
            <label htmlFor="images" className="block text-lg font-medium text-gray-700">
              Images
            </label>
            <ImageUpload onChange={(urls: string[]) => setValue("images", urls)} value={[]} />
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}
          </div>

              <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
            >
              <option value="">-- Select Category --</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="tablets">Tablets</option>
              <option value="accessories">Accessories</option>
              <option value="smartwatches">Smartwatches</option>
              <option value="headphones">Headphones & Earbuds</option>
              <option value="cameras">Cameras</option>
              <option value="tv">Televisions</option>
              <option value="gaming">Gaming Consoles</option>
              <option value="home-appliances">Home Appliances</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          
          {/* Color Options */}
          <div>
            <label htmlFor="colorOptions" className="block text-sm font-medium text-gray-700">
              Color Options (comma-separated)
            </label>
            <input
              id="colorOptions"
              type="text"
              placeholder="e.g Black, White, Blue"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
              onChange={(e) =>
                setValue(
                  "colorOptions",
                  e.target.value
                    .split(",")
                    .map((c) => c.trim())
                    .filter((c) => c.length > 0)
                )
              }
            />
            {errors.colorOptions && <p className="text-red-500 text-xs mt-1">{errors.colorOptions.message as string}</p>}
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg shadow-md"
            >
              Save Product
            </Button>
            <Button
              variant="outline"
              type="button"
              className="flex-1 border-gray-400 text-gray-600 hover:bg-gray-100 py-2 rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
