'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontalIcon, PlusCircleIcon } from 'lucide-react';


interface Coupon {
  id: string;
  code: string;
  discount: number; // percentage
  status: 'Active' | 'Expired' | 'Upcoming';
  validFrom: string;
  validTo: string;
}

const coupons: Coupon[] = [
  { id: 'coupon_1', code: 'SUMMER25', discount: 25, status: 'Active', validFrom: '2025-08-01', validTo: '2025-08-31' },
  { id: 'coupon_2', code: 'WELCOME10', discount: 10, status: 'Expired', validFrom: '2025-06-01', validTo: '2025-06-30' },
  { id: 'coupon_3', code: 'FESTIVE50', discount: 50, status: 'Upcoming', validFrom: '2025-09-01', validTo: '2025-09-15' },
];


const DashboardCouponsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Coupons</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your discount codes and their validity.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" className="hidden sm:inline-flex">
            <PlusCircleIcon className="h-4 w-4 mr-2" /> Add Coupon
          </Button>
        </div>
      </header>

      {/* Coupons Table */}
      <Card className="flex-1 overflow-hidden">
        <CardHeader>
          <CardTitle>Coupon List</CardTitle>
          <CardDescription>A list of all your coupons.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coupon Code</TableHead>
                  <TableHead className="hidden md:table-cell">Discount</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Valid From</TableHead>
                  <TableHead className="hidden md:table-cell">Valid To</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="font-medium">{coupon.code}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{coupon.discount}%</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className={
                          coupon.status === 'Active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : coupon.status === 'Expired'
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }
                      >
                        {coupon.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{coupon.validFrom}</TableCell>
                    <TableCell className="hidden md:table-cell">{coupon.validTo}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </div>
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

export default DashboardCouponsPage;
