export interface Product {
  id?: string;                 
  name: string;                 
  description?: string;         
  price: number;               
  stock: number;               
  category?: string;            
  images: string[];            
  isPublished?: boolean;         
  brand?: string;
  warrenty?: string;
  dimensions?: string;
  weight?: string;
  colorOptions?: string[];
  material?: string;
}

export interface CartItem {
  isSelected?:boolean;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  description?: string | null;
  color?: string;
  image?:string;
}
export interface ProductDetailSelectorType {
  id: string;
  colorOptions: string[];
  stock?: number;
  name: string;
  quantity?:number;
  description: string;
  price:number
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  dateAdded: Date; 
}

export interface WishlistItemBackend {
  id: string;
  wishlistId: string;
  productId: string;
  product: {
    name: string;
    price: number;
    images: [string];
    description?: string;
    dateAdded: Date;
  }
}
