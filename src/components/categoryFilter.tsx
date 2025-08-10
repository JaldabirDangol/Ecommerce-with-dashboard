"use client";
import { useState } from "react";
import { Collapse } from "react-collapse";

const CategoryFilter = ({
  categories,
}: {
  categories: { id: string; name: string }[];
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryCollapse, setCategoryCollapse] = useState(true);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-full">
      <h2
        onClick={() => setCategoryCollapse(!categoryCollapse)}
        className="text-lg text-gray-500 hover:cursor-pointer"
      >
        Categories
      </h2>

      <Collapse
        isOpened={categoryCollapse}
        theme={{
          collapse: "transition-all duration-500 ease-in-out overflow-hidden",
        }}
        className="flex flex-col gap-2"
      >
        {categories &&
          categories.map((item) => (
            <label key={item.id} className="flex items-center gap-2 hover:cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(item.name)}
                onChange={() => toggleCategory(item.name)}
              />
              {item.name}
            </label>
          ))}
      </Collapse>

      <div className="mt-2 text-sm text-gray-600">
        Selected: {selectedCategories.join(", ") || "None"}
      </div>
    </div>
  );
};

export default CategoryFilter;
