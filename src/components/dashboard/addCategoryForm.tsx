"use client";

import { useTransition, useState } from "react";
import { createCategory } from "@/actions/category";

export default function AddCategoryForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await createCategory(formData);
        setMessage("✅ Category added successfully!");
        e.currentTarget.reset();
      } catch (error: any) {
        setMessage("❌ " + error.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Category Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full rounded-md border px-3 py-2 mt-1"
          placeholder="Enter category name"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add Category"}
      </button>

      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
