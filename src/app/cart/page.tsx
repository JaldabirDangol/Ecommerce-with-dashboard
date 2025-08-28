import { CartItem } from "@/components/cartItem";
import { Trash } from "lucide-react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import OrderSummary from "@/components/orderSummary";

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
      
     <OrderSummary/>
    </div>
  );
};

export default cartPage;