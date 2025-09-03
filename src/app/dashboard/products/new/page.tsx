"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/uploadImage";
import { useActionState, useEffect, useState } from "react";
import { createProductHandler } from "@/actions/product";
import { toast } from "sonner";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  description: z.string().min(50,"Description is required"),
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
  { id: "description", label: "Description", type: "text", placeholder: "e.g Apple macbook air m4  is a ....." },
  { id: "price", label: "Price", type: "number", placeholder: "e.g., 999.99", step: "0.01" },
  { id: "stock", label: "Stock", type: "number", placeholder: "e.g., 50" },
  { id: "warrenty", label: "Warranty", type: "text", placeholder: "e.g 1 year" },
  { id: "dimensions", label: "Dimensions", type: "text", placeholder: "e.g 15x10x2 inches" },
  { id: "weight", label: "Weight", type: "text", placeholder: "e.g 1.5 kg" },
  { id: "material", label: "Material", type: "text", placeholder: "e.g Aluminum" },
];

export default function Page() {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      name: "",
      description: "",
      brand: "",
      price: 1,
      stock: 1,
      images: [],
      warrenty: "",
      material: "",
      colorOptions: [],
      dimensions: "",
      weight: "",
      category: "",
    },
  });

  const initialState = { error: undefined, success: false, message: "" };
  const [state, formAction] = useActionState(createProductHandler, initialState);
  
  const [categories, setCategories] = useState<{name:string,image:string}[]>([]);

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const res = await fetch("/api/product/category");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch(err) {
        console.log(err)
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast(state.message)
      methods.reset();
    }
    if (state.error) {
      console.error(state.message);
    }
  }, [state, methods]);

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
  });

  return (
    <div className="min-h-screen  ">
      <div className="max-w-5xl mx-auto">
       
        
        <FormProvider {...methods}>
          <form
            onSubmit={submitHandler}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-5">
                  <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
                  <p className="mt-1 text-sm text-gray-500">Essential details about your product</p>
                </div>
                
                <div className="space-y-5">
                  {formFields.slice(0, 5).map(({ id, label, type, placeholder, step }) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <input
                        id={id}
                        type={type}
                        step={step}
                        placeholder={placeholder}
                        {...methods.register(id as keyof ProductFormValues, { valueAsNumber: type === "number" })}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {methods.formState.errors[id as keyof ProductFormValues] && (
                        <p className="text-red-500 text-xs mt-1">
                          {(methods.formState.errors[id as keyof ProductFormValues]?.message as string) || ""}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="border-b border-gray-200 pb-5 pt-2">
                  <h2 className="text-lg font-medium text-gray-900">Specifications</h2>
                  <p className="mt-1 text-sm text-gray-500">Additional product details</p>
                </div>
                
                <div className="space-y-5">
                  {formFields.slice(5).map(({ id, label, type, placeholder, step }) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <input
                        id={id}
                        type={type}
                        step={step}
                        placeholder={placeholder}
                        {...methods.register(id as keyof ProductFormValues, { valueAsNumber: type === "number" })}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {methods.formState.errors[id as keyof ProductFormValues] && (
                        <p className="text-red-500 text-xs mt-1">
                          {(methods.formState.errors[id as keyof ProductFormValues]?.message as string) || ""}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Media and Options */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-5">
                  <h2 className="text-lg font-medium text-gray-900">Media & Options</h2>
                  <p className="mt-1 text-sm text-gray-500">Images and product variations</p>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                      Product Images
                    </label>
                    <ImageUpload />
                    {methods.formState.errors.images && (
                      <p className="text-red-500 text-xs mt-1">{methods.formState.errors.images.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      {...methods.register("category")}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

                  <div className="space-y-2">
                    <label htmlFor="colorOptions" className="block text-sm font-medium text-gray-700">
                      Color Options (comma-separated)
                    </label>
                    <input
                      id="colorOptions"
                      type="text"
                      placeholder="e.g Black, White, Blue"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="bg-gray-50 px-8 py-5 border-t border-gray-200">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4">
                <Button
                  variant="outline"
                  type="button"
                  className="mt-3 sm:mt-0 w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={() => methods.reset()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Save Product
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}