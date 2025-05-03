import { Product } from './product';

export interface Wishlist {
    id: number;
    user: number;
    product: Product;
    created_at: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderCreate {
  shipping_address: string;
  payment_method: string;
}

export interface Order {
  id: number;
  user: number;
  shipping_address: string;
  payment_method: string;
  status: string;
  total_price: number;
  session_key?: string;
  cancellation_reason?: string;
  canceled_by?: number;
  created_at: string;
  items: OrderItem[];
}

export interface OrderData {
  payment_method: string;
  shipping_address: string
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone_number: string;
  billing_address?: string;
  card_last_four_digits: string;
  comments?: string;
}

export interface PaymentData {
  amount: number;
  currency_code: string;
  order_id: string;
  success_url: string;
  cancel_url: string;
  failure_url: string;
  }
