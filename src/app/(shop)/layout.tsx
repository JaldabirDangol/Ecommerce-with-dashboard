// app/shop/layout.tsx
import { Navbar } from '@/components/shopLayout/navbar';
import React from 'react';

export const metadata = {
  title: 'Shop',
  description: 'Browse our amazing products!',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-y-auto text-gray-900">
      <Navbar/>
      {children}
    </div>
  );
}
