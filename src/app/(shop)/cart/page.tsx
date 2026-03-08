import { CartItem } from "@/components/cartItem";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import OrderSummary from "@/components/orderSummary";
import { CartInitializer } from "@/components/cartInitializer";
import CartActions from "@/components/client/cartActions";

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

  return (
    <div className="w-full h-full pt-2 flex justify-center gap-2">
      <CartInitializer initialItems={cartItems} />

      <div className="w-[65%] flex flex-col gap-4">
        <CartActions />
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
           <CartItem key={item.id} cartItemId={item.id} productId={item.product.id} />

          ))
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">Your cart is empty.</div>
        )}
      </div>
      
      <OrderSummary />
    </div>
  );
};

export default cartPage;