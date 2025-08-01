import AddCategoryForm from "@/components/dashboard/addCategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Add New Category</h1>
      <AddCategoryForm />
    </div>
  );
}
