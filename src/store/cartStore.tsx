import {create} from "zustand";

interface CartItem {
    productId:string;
    productName:string;
    quantity:number;
    price:number;
}


interface CartState {
    items:CartItem[];
    addToCart:(item:CartItem)=>void;
    removeFromCart:(productId: string)=>void;
}

export const useCartStore = create<CartState>((set)=>({
    items:[],
    addToCart:(newItem)=>set((state)=>{
       const exists = state.items.find(i=>i.productId === newItem.productId);

 if (exists) {
  return {
    items: state.items.map(i =>
      i.productId === newItem.productId
        ? { ...i, quantity: i.quantity + newItem.quantity }
        : i
    ),
  };
}
  return { items: [...state.items, newItem] };
    }),


   removeFromCart: (productId) =>
  set((state) => ({
    items: state.items.filter(item => item.productId !== productId)
  })),


}))