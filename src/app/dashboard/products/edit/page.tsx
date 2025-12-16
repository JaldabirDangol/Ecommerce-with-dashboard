"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/uploadImage";
import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import { updateProductDetails, getProductById } from "@/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  id: z.string().optional(),
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
  images: z.array(z.url("Must be a valid URL")).nonempty("At least one image is required"),
  colorOptions: z.array(z.string().min(1, "Color option cannot be empty")).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

const formFields = [
  { id: "name", label: "Name", type: "text", placeholder: "e.g., Laptop Pro" },
  { id: "brand", label: "Brand", type: "text", placeholder: "e.g Apple" },
  { id: "price", label: "Price", type: "number", placeholder: "e.g., 999.99", step: "0.01" },
  { id: "stock", label: "Stock", type: "number", placeholder: "e.g., 50" },
  { id: "warrenty", label: "Warrenty", type: "text", placeholder: "e.g 1 year" },
  { id: "dimensions", label: "Dimensions", type: "text", placeholder: "e.g 15x10x2 inches" },
  { id: "weight", label: "Weight", type: "text", placeholder: "e.g 1.5 kg" },
  { id: "material", label: "Material", type: "text", placeholder: "e.g Aluminum" },
];

export default function Page() {
  const searchParams = useSearchParams(); 
  const productId = searchParams.get("id"); 

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
  });

  const initialState = { error: undefined, success: false, message: "" };
  const [state, formAction] = useActionState(updateProductDetails, initialState);
  const [categories, setCategories] = useState<{ name: string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) {
        setLoading(false);
        toast.error("Product ID is missing in the URL.");
        return;
      }
      try {
        const categoryRes =  await fetch("http://localhost:3000/api/product/category", {
  next: { revalidate: 120 }, 
});
        if (!categoryRes.ok) throw new Error("Failed to fetch categories");
        const categoryData = await categoryRes.json();
        setCategories(categoryData);

        const product = await getProductById(productId);

        if (product) {
          methods.reset({
            id: product.id,
            name: product.name,
            description: product.description || "",
            category: product.categoryId,
            price: product.price,
            stock: product.stock,
            brand: product.brand || "",
            warrenty: product.warrenty || "",
            dimensions: product.dimensions || "",
            weight: product.weight || "",
            material: product.material || "",
            images: product.images,
            colorOptions: product.colorOptions || [],
          });
        }

      } catch (err) {
        console.error(err);
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, methods]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
    if (state.error) {
      toast.error(state.message);
    }
  }, [state]);

  const submitHandler = methods.handleSubmit((data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }
    formAction(formData);
     router.push("/dashboard"); 
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product data...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center px-6 py-12">
      <FormProvider {...methods}>
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl bg-white p-8 rounded-xl shadow-md border border-gray-200"
        >
          <div className="flex flex-col gap-4">
            {formFields.map(({ id, label, type, placeholder, step }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  step={step}
                  placeholder={placeholder}
                  {...methods.register(id as keyof ProductFormValues, {
                    valueAsNumber: type === "number",
                  })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
                />
                {methods.formState.errors[id as keyof ProductFormValues] && (
                  <p className="text-red-500 text-xs mt-1">
                    {(methods.formState.errors[id as keyof ProductFormValues]?.message as string) ||
                      ""}
                  </p>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                rows={4}
                {...methods.register("description")}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 flex-col items-start">
              <label
                htmlFor="images"
                className="block text-lg font-medium text-gray-700"
              >
                Images
              </label>
              <ImageUpload />
              {methods.formState.errors.images && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.images.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                {...methods.register("category")}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {methods.formState.errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="colorOptions"
                className="block text-sm font-medium text-gray-700"
              >
                Color Options (comma-separated)
              </label>
              <input
                id="colorOptions"
                type="text"
                placeholder="e.g Black, White, Blue"
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
                onChange={(e) =>
                  methods.setValue(
                    "colorOptions",
                    e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter((c) => c.length > 0),
                    { shouldValidate: true }
                  )
                }
              />
              {methods.formState.errors.colorOptions && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.colorOptions.message as string}
                </p>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg shadow-md"
              >
                Update Product
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex-1 border-gray-400 text-gray-600 hover:bg-gray-100 py-2 rounded-lg"
                onClick={() => {
                  methods.reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}