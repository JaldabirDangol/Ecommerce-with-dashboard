"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Image from "next/image";
import ToggleSwitch from "./toggleSwitchTable";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react"; 
import ProductTableSkeleton from "@/app/dashboard/products/loading";

type Product = {
  id: string;
  images?: [string];
  name: string;
  price: number;
  status: boolean;
  stock: number;
};

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex items-center justify-center h-12 w-12 rounded overflow-hidden">
        {row.original.images ? (
          <Image
            src={row.original.images[0]}
            alt={row.original.name}
            height={50}
            width={50}
            className="object-cover h-full w-full"
          />
        ) : (
          <span className="text-gray-400 text-xs">No Img</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ getValue }) => (
      <span>${getValue<number>().toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<boolean>();
      return <ToggleSwitch value={status} />;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ getValue }) => (
      <span>{getValue<number>()}</span>
    ),
  },
];

const ProductTable = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/category/products');
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }
        
        const returnedData = await res.json();
        setData(returnedData.products); 
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  
  if(loading){
    return <ProductTableSkeleton/>
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-red-500">
        <AlertCircle className="h-10 w-10 mb-2" />
        <p className="text-lg font-medium">{error}</p>
        <p className="text-sm text-gray-400 mt-1">Please try again later.</p>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
        <div className="flex justify-center items-center p-8 text-gray-500">
            No products found.
        </div>
    );
  }

  return (
    <div className="w-full h-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white shadow rounded">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-sm text-gray-700 text-left"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;