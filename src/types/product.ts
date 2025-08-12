export interface Product {
  id?: string;                 
  name: string;                 
  description?: string;         
  price: number;               
  stock: number;               
  category: string;            
  images: string[];            
  isPublished?: boolean;         
  brand?: string;
  warrenty?: string;
  dimensions?: string;
  weight?: string;
  colorOptions?: string[];
  material?: string;
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