import { CartItem } from "@/components/cartItem";
import { Trash } from "lucide-react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";

const cartFetcher = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }
  const userId = session.user.id;
  const userCart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: { items: { include: { product: true } } },
  });

  return userCart?.items || [];
};

const cartPage = async () => {
  const cartItems = await cartFetcher();
  console.log("cartpage",cartItems )

  return (
    <div className="w-full h-full pt-2 flex justify-center gap-2">
      <div className="w-[65%] flex flex-col gap-4">
        <div className="bg-white flex justify-between w-full mt-2 p-4 rounded-2xl items-center">
          <div className="flex gap-4 items-center">
            <MdOutlineCheckBoxOutlineBlank className="w-6 h-6" />
            <p>SELECT ALL ITEMS</p>
          </div>
          <div className="flex gap-2 items-center text-red-600 cursor-pointer">
            <Trash />
            <span className="font-semibold text-xl">Delete</span>
          </div>
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">Your cart is empty.</div>
        )}
      </div>
      
      <div className="w-[27%] bg-white p-6 rounded-lg shadow-md h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-700">Shipping</p>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gray-800">Rs. [Calculated Shipping]</p>
            <button className="text-blue-600 text-sm hover:underline font-medium">Change</button>
          </div>
        </div>
        <div className="flex justify-between items-center text-lg mb-3">
          <p className="text-gray-700">Subtotal</p>
          <p className="font-semibold text-gray-800">Rs. [Calculated Subtotal]</p>
        </div>
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <label htmlFor="voucher" className="block text-sm font-medium text-gray-700 mb-2">
            Have a voucher code?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="voucher"
              placeholder="Enter code"
              className="flex-grow p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
            <button className="bg-blue-500 text-white py-2 px-5 rounded-md hover:bg-blue-600 transition duration-200 font-medium">
              Apply
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center text-md mb-3 text-green-600">
          <p>Voucher Discount</p>
          <p>- Rs. [Calculated Voucher Discount]</p>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-4 mt-4">
          <p className="font-bold text-xl text-gray-800">Total</p>
          <p className="font-bold text-xl text-blue-700">Rs. [Calculated Total]</p>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200 text-lg font-semibold shadow-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default cartPage;