import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, MoreHorizontalIcon, PlusCircleIcon, SearchIcon } from 'lucide-react';

// Define the data structure for a customer
interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastOrder: string;
  totalOrders: number;
}

// Mock data to display on the page
const customers: Customer[] = [
  {
    id: 'cust_1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    lastOrder: '2025-08-19',
    totalOrders: 12,
  },
  {
    id: 'cust_2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'Active',
    lastOrder: '2025-08-15',
    totalOrders: 5,
  },
  {
    id: 'cust_3',
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
    status: 'Inactive',
    lastOrder: '2025-07-20',
    totalOrders: 2,
  },
  {
    id: 'cust_4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'Pending',
    lastOrder: '2025-08-18',
    totalOrders: 1,
  },
  {
    id: 'cust_5',
    name: 'Chris Wilson',
    email: 'chris.wilson@example.com',
    status: 'Active',
    lastOrder: '2025-08-10',
    totalOrders: 8,
  },
];

const DashboardCustomersPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 space-y-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Customers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your customer base and view their activity.</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Example of a search bar or filter, you can add more functionality here */}
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <SearchIcon className="h-4 w-4 mr-2" /> Search
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">
            <PlusCircleIcon className="h-4 w-4 mr-2" /> Add Customer
          </Button>
        </div>
      </header>

      {/* Main content area with a card for the customer table */}
      <Card className="flex-1 overflow-hidden">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            A list of all your customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Order</TableHead>
                  <TableHead className="hidden md:table-cell">Total Orders</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="font-medium">{customer.name}</div>
                      <div className="hidden text-sm text-gray-500 dark:text-gray-400 sm:inline-block">
                        {customer.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge 
                        variant="outline" 
                        className={
                          customer.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 
                          customer.status === 'Inactive' ? 'bg-red-100 text-red-800 border-red-200' : 
                          'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer.lastOrder}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer.totalOrders}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
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

export default DashboardCustomersPage;
