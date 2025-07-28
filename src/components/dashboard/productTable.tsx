"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Image from "next/image";

type Product = {
  image?: string;
  name: string;
  price: number;
  status: boolean;
  id?: string;
};

const data: Product[] = [
  {
    id: "prod1",
    image: "/images/product1.jpg",
    name: "Wireless Headphones",
    price: 99.99,
    status: true,
  },
  {
    id: "prod2",
    image: "/images/product2.jpg",
    name: "Smartwatch",
    price: 199.5,
    status: false,
  },
  {
    id: "prod3",
    image: "/images/product3.jpg",
    name: "Ergonomic Mouse",
    price: 45.0,
    status: true,
  },
  {
    id: "prod4",
    image: "/images/product4.jpg",
    name: "USB-C Hub",
    price: 29.99,
    status: true,
  },
];

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex items-center justify-center h-12 w-12 rounded overflow-hidden">
        {row.original.image ? (
          <Image
            src={row.original.image}
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
    accessorKey: "status",
    header: "In Stock",
    cell: ({ getValue }) => (
      <span
        className={`px-2 py-1 rounded text-white text-sm ${
          getValue<boolean>() ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {getValue<boolean>() ? "Available" : "Out of Stock"}
      </span>
    ),
  },
];

const ProductTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

return (
  <div className="w-full h-full overflow-x-auto">
    <table className="min-w-full border border-gray-200 bg-white shadow rounded">
      
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b "
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
