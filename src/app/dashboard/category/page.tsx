"use client"
import AddCategoryForm from "@/components/dashboard/addCategoryForm";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; 

export default function NewCategoryPage() {
    const [categories, setCategories] = useState<{ name: string, image: string, slug: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/product/category");
                
                if (!res.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await res.json();
                
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };
        
        fetchCategories();
    }, []);
    
    return (
        <div className="p-4 flex flex-col lg:flex-row gap-4 w-full">
         <div className="flex flex-col flex-1 justify-between items-center w-full lg:justify-normal lg:items-start">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Add New Category</h1>
                <AddCategoryForm />
            </div>

            <div className="w-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Categories</h2>
                {categories.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <Link 
                                key={category.slug} 
                                href={`/dashboard/category/${category.slug}`}
                                className="transform transition-transform hover:scale-105"
                            >
                                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center space-y-2 text-center h-full">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <span className="font-medium text-sm text-gray-700 mt-2">
                                        {category.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 p-6 rounded-xl text-center text-gray-500 shadow-sm">
                        No categories found.
                    </div>
                )}
            </div>
        </div>
    );
}

