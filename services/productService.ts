import apiClient from "@/lib/apiClient";
import { Product, ProductCreateUpdate, Brand, PaginatedResponse } from "@/types/product";

// Add a new product
export const addProduct = async (productData: ProductCreateUpdate): Promise<Product> => {
  const { data } = await apiClient.post("/products/products/create", productData);
  return data;
};

// Get all products
export const getAllProducts = async (
  category?: number,
  brand?: number,
  page?: number,
  page_size?: number
): Promise<PaginatedResponse<Product>> => {
  const params: { category?: number; brand?: number; page?: number; page_size?: number } = {};
  if (category) params.category = category;
  if (brand) params.brand = brand;
  if (page) params.page = page;
  if (page_size) params.page_size = page_size;
  else params.page_size = 1000; // Default page size if not provided
  const { data } = await apiClient.get("/products/products", { params });
  // The API returns a wrapper under data.data with count, next, previous, results
  return data.data as PaginatedResponse<Product>;
};

// Get product by ID
export const getProductById = async (productId: number): Promise<Product> => {
  const { data } = await apiClient.get(`/products/products/${productId}/`);
  return data.data;
};

// Get all brands
export const getAllBrands = async (): Promise<Brand[]> => {
    const { data } = await apiClient.get("/products/brands");
    return data;
};

