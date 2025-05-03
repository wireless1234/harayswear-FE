import { Brand } from "./product";

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product_name: string;
  name: string;
  price: number;
  quantity: number;
  total_price: number;
}

export interface Cart {
    brand: Brand;
    items: CartItem[];
}[]