"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DashboardCustomersSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 }); // number of rows in table

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 space-y-4 bg-gray-50 dark:bg-gray-900 min-h-screen animate-pulse">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </header>

      {/* Customer List Table */}
      <Card className="flex-1 overflow-hidden">
        <CardHeader>
          <CardTitle className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></CardTitle>
          <CardDescription className="h-3 w-64 bg-gray-200 dark:bg-gray-700 rounded mt-1"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></TableHead>
                  <TableHead className="h-4 bg-gray-300 dark:bg-gray-700 rounded hidden md:table-cell"></TableHead>
                  <TableHead className="h-4 bg-gray-300 dark:bg-gray-700 rounded hidden md:table-cell"></TableHead>
                  <TableHead className="h-4 bg-gray-300 dark:bg-gray-700 rounded hidden md:table-cell"></TableHead>
                  <TableHead className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skeletonRows.map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded hidden sm:inline-block"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded ml-auto"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCustomersSkeleton;
