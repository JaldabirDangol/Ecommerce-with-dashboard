"use client";

import { useCartStore } from "@/store/cartStore";
import { Trash } from "lucide-react";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export default function CartActions() {
  const items = useCartStore((state) => state.items);
  const selectAll = useCartStore((state) => state.selectAll);
  const deselectAll = useCartStore((state) => state.deselectAll);

  const allSelected = items.length > 0 && items.every((item) => item.isSelected);

  const handleToggleAll = () => {
    if (allSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  return (
    <div className="bg-white flex justify-between w-full mt-2 p-4 rounded-2xl items-center">
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={handleToggleAll}
      >
        {allSelected ? (
          <MdOutlineCheckBox className="w-6 h-6" />
        ) : (
          <MdOutlineCheckBoxOutlineBlank className="w-6 h-6" />
        )}
        <p>SELECT ALL ITEMS</p>
      </div>
      <div className="flex gap-2 items-center text-red-600 cursor-pointer">
        <Trash />
        <span className="font-semibold text-xl">Delete</span>
      </div>
    </div>
  );
}
