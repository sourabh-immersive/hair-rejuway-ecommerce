'use server'

import apiClient from "./apiClient";

export const getProducts = async (limit?: number) => {
  console.log('called in server');
  try {
    const requestBody = limit ? { limit } : {};
    const response = await apiClient.post("/front/products", requestBody);

    if (response.data.status) {
      const products = response.data.data;
      if (Array.isArray(products)) {
        return products;
      } else {
        console.error("Expected products to be an array, but got:", products);
        throw new Error("Fetched data is not an array");
      }
    } else {
      console.error("Error fetching products:", response.data.error);
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch all product categories
export const getProductCategories = async () => {
  try {
    const response = await apiClient.get(`/front/categories`);
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching product categories:`, error);
    throw error;
  }
};

export const getProductsByCatId = async (category: string) => {
  try {
    const requestBody = category ? { category } : {};
    const response = await apiClient.post(`/front/products`, requestBody);

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching product with category ID ${category}:`);
    throw error;
  }
};


// Fetch Single Product by Slug
export const getProductBySlug = async (slug: string) => {
  try {
    const response = await apiClient.get(`/front/product/${slug}/details`);
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${slug}:`, error);
    throw error;
  }
};

// Fetch Single Product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Add New Product (Protected Route)
export const addProduct = async (productData: any) => {
  try {
    const response = await apiClient.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
