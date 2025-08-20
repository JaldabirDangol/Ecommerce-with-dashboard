"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";

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
  images: z.array(z.string().url("Must be a valid URL")).nonempty("At least one image is required"),
  colorOptions: z.array(z.string().min(1, "Color option cannot be empty")).optional(),
});

export const createProductHandler = async (
  prevState: { error?: string; success?: boolean; message?: string },
  formData: FormData
): Promise<{ error?: string; success?: boolean; message?: string }> => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const brand = formData.get("brand") as string;
    const warrenty = formData.get("warrenty") as string;
    const dimensions = formData.get("dimensions") as string;
    const weight = formData.get("weight") as string;
    const material = formData.get("material") as string;
    const images = formData.getAll("images") as string[];
    const colorOptions = formData.getAll("colorOptions") as string[];

    const parsedData = formSchema.safeParse({
      name,
      description,
      category,
      price,
      stock,
      brand,
      warrenty,
      dimensions,
      weight,
      material,
      images,
      colorOptions: colorOptions.length > 0 ? colorOptions : undefined,
    });

    
if (!parsedData.success) {
  const fieldErrors = parsedData.error.issues
    .map((err) => `${err.path.join(".")}: ${err.message}`)
    .join(", ");

  return { error: "Validation failed", success: false, message: fieldErrors };
}


    const productData = parsedData.data;

    console.log(productData.images)

    await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        categoryId: productData.category,
        price: productData.price,
        stock: productData.stock,
        brand: productData.brand,
        warrenty: productData.warrenty,
        dimensions: productData.dimensions,
        weight: productData.weight,
        material: productData.material,
        images: productData.images,
        colorOptions: productData.colorOptions ?? [],
      },
    });

    return { success: true, error: undefined, message: "Product created successfully!" };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      error: "Server error",
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const updateProductDetails = async (
  prevState: { error?: string; success?: boolean; message?: string },
  formData: FormData
): Promise<{ error?: string; success?: boolean; message?: string }> => {
  try {
    const productId = formData.get("id") as string;

    if (!productId) {
      return { error: "Product ID is missing.", success: false, message: "Product ID is required to update the product." };
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const brand = formData.get("brand") as string;
    const warrenty = formData.get("warrenty") as string;
    const dimensions = formData.get("dimensions") as string;
    const weight = formData.get("weight") as string;
    const material = formData.get("material") as string;
    const images = formData.getAll("images") as string[];
    const colorOptions = formData.getAll("colorOptions") as string[];

    const parsedData = formSchema.safeParse({
      name,
      description,
      category,
      price,
      stock,
      brand,
      warrenty,
      dimensions,
      weight,
      material,
      images,
      colorOptions: colorOptions.length > 0 ? colorOptions : undefined,
    });

    if (!parsedData.success) {
      const fieldErrors = parsedData.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return { error: "Validation failed", success: false, message: fieldErrors };
    }

    const productData = parsedData.data;

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: productData.name,
        description: productData.description,
        categoryId: productData.category,
        price: productData.price,
        stock: productData.stock,
        brand: productData.brand,
        warrenty: productData.warrenty,
        dimensions: productData.dimensions,
        weight: productData.weight,
        material: productData.material,
        images: productData.images,
        colorOptions: productData.colorOptions ?? [],
      },
    });

    console.log("Product updated:", updatedProduct);
    return { success: true, error: undefined, message: "Product updated successfully!" };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      error: "Server error",
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const getProductById = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true, 
      },
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};