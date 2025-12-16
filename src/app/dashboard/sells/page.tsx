import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSignIcon, ShoppingCartIcon, TrendingUpIcon, FileTextIcon, MoreHorizontalIcon, PlusCircleIcon } from 'lucide-react';
import { latestOrderItem } from '@/actions/order'; 
export const dynamic = "force-dynamic";


const DashboardSalesPage = async () => {
  const sales = await latestOrderItem();

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2);
  const completedSalesCount = sales.filter(sale => sale.status === 'Completed').length;
  const processingSalesCount = sales.filter(sale => sale.status === 'Processing').length;
  const refundedSalesCount = sales.filter(sale => sale.status === 'Refunded').length;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Sales</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your recent sales activity.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" className="hidden sm:inline-flex">
            <PlusCircleIcon className="h-4 w-4 mr-2" /> New Sale
          </Button>
        </div>
      </header>

      {/* Sales metrics summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sales</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSalesCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Orders</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingSalesCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Currently awaiting fulfillment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds</CardTitle>
            <FileTextIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{refundedSalesCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Processed this period</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent sales table */}
      <Card className="flex-1 overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            A list of your latest sales transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div className="font-medium">{sale.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{sale.customerName}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge 
                        variant="outline" 
                        className={
                          sale.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : 
                          sale.status === 'Refunded' ? 'bg-red-100 text-red-800 border-red-200' : 
                          'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }
                      >
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{sale.date}</TableCell>
                    <TableCell className="text-right font-medium">${sale.amount.toFixed(2)}</TableCell>
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

export default DashboardSalesPage;
