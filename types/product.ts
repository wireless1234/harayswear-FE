export interface Category {
  id: number;
  name: string;
  [key: string]: any;
}

export interface Brand {
  id: number;
  name: string;
  desription?: string;
  logo?: string;
}

export interface Product {
  id: number;
  name: string;
  short_description: string;
  long_description?: string;
  features?: string;
  specification?: string;
  usage_instruction?: string;
  price: number;
  discounted_price: number;
  stock: number;
  category: Category;
  brand: Brand;
  images: string;
  tax: number;
}

export interface ProductDetail extends Product {
  long_description?: string;
  features?: string;
  specification?: string;
  usage_instruction?: string;
  bulk_price?: number;
  currency?: string;
  max_order?: number;
  min_order?: number;
  available_sizes?: string[];
  material_options?: string[];
  customizable_options?: string[];
  shipping_weight_dimension?: string;
  shipping_restriction?: string;
}

export interface ProductCreateUpdate {
  name: string;
  short_description: string;
  long_description?: string;
  features?: string;
  specification?: string;
  usage_instruction?: string;
  price: number;
  discounted_price?: number;
  bulk_price?: number;
  currency?: string;
  tax?: number;
  max_order?: number;
  min_order?: number;
  available_sizes?: string[];
  material_options?: string[];
  customizable_options?: string[];
  shipping_weight_dimension?: string;
  shipping_restriction?: string;
  stock: number;
  category: number; // ID reference
  brand: number; // ID reference
  images: string[];
}
