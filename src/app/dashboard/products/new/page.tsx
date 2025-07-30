"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/uploadImage";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category:z.string().min(2,"Category is required"),
  price: z.number().min(1, "Price must be at least 1"),
  stock: z.number().min(1, "Stock must be minimum 1"),
  image: z.url("Must be a valid URL").optional().or(z.literal("")),
  status: z.boolean(),
  id:z.string().optional()
})


type ProductFormValues = z.infer<typeof formSchema>;
const Page = () => {
      const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 1,
      stock: 1,
      status: true,
      id: undefined,
      image: "",
    },
  });

  function submitHandler(values: ProductFormValues) {
    console.log("Form submitted with values:", values);
  }
  return (
   <div className="w-full h-full flex justify-center items-center bg-gray-100  px-6 rounded-2xl shadow-lg">
  <form 
    onSubmit={handleSubmit(submitHandler)} 
    className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl bg-white p-8 rounded-xl shadow-md"
  >
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
        <input 
          id="name" 
          {...register("name")} 
          type="text" 
          placeholder="e.g., Laptop Pro" 
          className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
      <select
    id="category"
    {...register("category")}
    className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
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

      <div>
        <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price</label>
        <input 
          id="price" 
          {...register("price", { valueAsNumber: true })} 
          type="number" 
          placeholder="e.g., 999.99" 
          step="0.01"
          className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-semibold text-gray-700">Stock</label>
        <input 
          id="stock" 
          {...register("stock", { valueAsNumber: true })} 
          type="number" 
          placeholder="e.g., 50" 
          className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <input 
          id="status" 
          {...register("status")} 
          type="checkbox" 
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="status" className="text-sm font-semibold text-gray-700">Active</label>
        {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
      </div>
    </div>

    <div className="flex flex-col justify-between gap-6">
      <div className="flex gap-4 flex-col items-start">
        <label htmlFor="image" className="block text-lg font-semibold text-gray-700">Image</label>

     
    <ImageUpload/>
        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
      </div>
      <div className="flex gap-4 mt-6">
        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md">
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

  )
}

export default Page




