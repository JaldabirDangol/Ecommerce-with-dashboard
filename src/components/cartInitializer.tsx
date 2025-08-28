"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

interface InitialCartItem {
  id: string; 
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string | null; 
    price: number;
    images: string[];
  };
}

interface CartInitializerProps {
  initialItems: InitialCartItem[];
}

export const CartInitializer = ({ initialItems }: CartInitializerProps) => {
  const setItems = useCartStore((state) => state.setItems);

  useEffect(() => {
    const transformedItems = initialItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      isSelected: true,
      description: item.product.description,
      image: item.product.images[0],
    }));
    
    setItems(transformedItems);
  }, [initialItems, setItems]);

  return null;
};