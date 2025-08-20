"use client"
import AddCategoryForm from "@/components/dashboard/addCategoryForm";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NewCategoryPage() {
    const [categories, setCategories] = useState<{ name: string, image: string }[]>([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/product/category");
                
                if (!res.ok) throw new Error("Failed to fetch categories");
                const data = await res.json();
                
                setCategories(data);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchCategories();
    }, []);
    
    return (
        <div className="p-4 flex gap-4 w-full">
            <div className="flex flex-col flex-1">
                <h1 className="text-2xl font-semibold mb-4">Add New Category</h1>
                <AddCategoryForm />
            </div>

            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Existing Categories</h2>
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-sm flex flex-col items-center">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover mb-2"
                                />
                                <span className="font-medium text-center">{category.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No categories found.</p>
                )}
            </div>
        </div>
    );
}