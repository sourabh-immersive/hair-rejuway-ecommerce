import apiClient from "./apiClient";

// Fetch Product List
// export const getProducts = async () => {
//   try {
//     const response = await apiClient.post('front/products');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };
export const getProducts = async () => {
  try {
    const response = await apiClient.post("/front/products"); // Use GET method
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
