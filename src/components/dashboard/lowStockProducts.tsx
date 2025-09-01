interface LowStockItem {
  id: string;
  name: string;
  stock: number;
  price: number; // keep as number
}

interface LowStockProductsProps {
  products: LowStockItem[];
}

const LowStockProducts = ({ products }: LowStockProductsProps) => {
  const maxLength = 20;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl flex flex-col shadow-sm h-93">
      <h2 className="text-lg font-semibold text-gray-800 m-2">
        Low Stock Products
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 h-full">
        <table className="min-w-full bg-white overflow-y-auto scrollbar-hide h-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-medium tracking-wider">
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {products.map((item, index) => {
              const displayedName =
                item.name.length > maxLength
                  ? item.name.substring(0, maxLength) + "..."
                  : item.name;

              const rowClassName =
                item.stock <= 5 ? "bg-red-50" : "hover:bg-gray-50";

              return (
                <tr
                  key={item.id || index}
                  className={`border-b border-gray-100 last:border-b-0 ${rowClassName}`}
                >
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      {item.stock <= 5 && (
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      )}
                      <span>{displayedName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-left font-medium">
                    <span
                      className={
                        item.stock <= 5 ? "text-red-600 font-bold" : ""
                      }
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-left">
                    ${item.price.toFixed(2)}
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="py-4 text-center text-gray-500"
                >
                  No low stock items.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockProducts;
