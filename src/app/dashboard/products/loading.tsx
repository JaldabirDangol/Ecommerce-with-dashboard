"use client";

import React from "react";

const ProductTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 }); // Number of skeleton rows

  return (
    <div className="w-full h-full overflow-x-auto animate-pulse">
      <table className="min-w-full border border-gray-200 bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
              Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
              Product Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
              Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
              Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, i) => (
            <tr key={i} className="border-b">
              <td className="px-4 py-2">
                <div className="h-10 w-10 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableSkeleton;
