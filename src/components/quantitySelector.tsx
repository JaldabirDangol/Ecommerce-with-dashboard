"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore"; // Zustand store example

interface QuantitySelectorProps {
  maxStock: number;
  productId: string;
  productName: string;
  price: number;
}

export default function QuantitySelector({ maxStock, productId, productName, price }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);

  const increase = () => {
    if (quantity < maxStock) setQuantity(q => q + 1);
  };
  const decrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleAddToCart = () => {
    addToCart({ productId, productName, quantity, price });
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <button onClick={decrease} disabled={quantity === 1}>-</button>
        <input type="number" value={quantity} readOnly />
        <button onClick={increase} disabled={quantity === maxStock}>+</button>
      </div>
      <button onClick={handleAddToCart} disabled={maxStock === 0}>
        Add to Cart
      </button>
    </div>
  );
}
