"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  stock: z.number().min(1, "Stock must be minimum 1"),
  image: z.url("Must be a valid URL").optional().or(z.literal("")),
  status: z.boolean(),
  id:z.string().optional()
})


type ProductFormValues = z.infer<typeof formSchema>;

export function AddProductButton() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" px-4 py-2 rounded-md bg-green-200 text-green-600 font-semibold hover:bg-cyan-900 
          ring-2 ring-green-500 flex items-center gap-1 hover:cursor-pointer hover:text-gray-300"
        >
          <Plus className="w-5 h-5" /> Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex w-full justify-center">Add a new product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label htmlFor="name">Product Name</label>
            <input id="name" {...register("name")} type="text" placeholder="e.g., Laptop Pro" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input id="price" {...register("price")} type="number" placeholder="e.g., 999.99" step="0.01" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label htmlFor="stock">Stock</label>
            <input id="stock" {...register("stock")} type="number" placeholder="e.g., 50" />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>

          <div>
            <label htmlFor="image">Image URL</label>
            <input id="image" {...register("image")} type="url" placeholder="e.g., https://example.com/image.jpg" />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          <div>
            <label htmlFor="status">Active</label>
            <input id="status" {...register("status")} type="checkbox" />
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit">Save Product</Button>
            <Button variant="outline">Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}