"use client";
import { useState } from "react";
import {Collapse} from "react-collapse"

const BrandFilter = ({ brands }: { brands: { brand: string }[] }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandCollapse, setBrandCollapse]  = useState(false)

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand) 
        : [...prev, brand] 
    );
  };

  return (
    <div className="w-full ">
      <h2 onClick={()=>setBrandCollapse(!brandCollapse)} className="text-lg text-gray-500 hover:cursor-pointer">Brand</h2>
      <Collapse isOpened={brandCollapse} theme={{
    collapse: 'transition-all duration-500 ease-in-out overflow-hidden'
  }}
   className="flex flex-col gap-2">
        {brands.map((item) => (
          <label key={item.brand} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedBrands.includes(item.brand)}
              onChange={() => toggleBrand(item.brand)}
            />
            {item.brand}
          </label>
        ))}
      </Collapse>

  
      <div className="mt-2 text-sm text-gray-600">
        Selected: {selectedBrands.join(", ") || "None"}
      </div>
    </div>
  );
};

export default BrandFilter;
