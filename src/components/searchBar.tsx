"use client";

import { Input } from "@/components/ui/input";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const searchBarHandler = () => {
    if (!searchTerm.trim()) return; 

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", searchTerm);

    router.push(`/product/?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center lg:w-md">
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchBarHandler()}
      />
      <IoSearchCircleOutline
        className="absolute right-2 w-8 h-8 cursor-pointer"
        onClick={searchBarHandler}
      />
    </div>
  );
};
