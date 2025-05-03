import apiClient from "@/lib/apiClient";
import { Product, ProductCreateUpdate, Brand } from "@/types/product";

// Add a new product
export const addProduct = async (productData: ProductCreateUpdate): Promise<Product> => {
  const { data } = await apiClient.post("/products/products/create", productData);
  return data;
};

// Get all products
export const getAllProducts = async (category?: number, brand?: number): Promise<Product[]> => {
  const params: { category?: number; brand?: number; page?: number; page_size?: number } = {};
  if (category) params.category = category;
  if (brand) params.brand = brand;
  params.page=1;
  params.page_size=100;
  const { data } = await apiClient.get("/products/products", { params });
  return data.data.results;
};

// Get product by ID
export const getProductById = async (productId: number): Promise<Product> => {
  const { data } = await apiClient.get(`/products/products${productId}/`);
  return data;
};

// Get all brands
export const getAllBrands = async (): Promise<Brand[]> => {
    const { data } = await apiClient.get("/products/brands");
    return data;
};

