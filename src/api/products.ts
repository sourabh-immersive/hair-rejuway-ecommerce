"use server";

import apiClient from "./apiClient";

export const getProducts = async (paginate?: number) => {
  // console.log("called in server");
  try {
    const requestBody = paginate ? { paginate } : {};
    const response = await apiClient.post("/front/products", requestBody);
    // console.log("getproducts response", response);
    if (response.status) {
      return {
        status: true,
        data: response.data.data,
        message: "Products fetched successfully!",
      };
    } else {
      console.error("Error fetching products:", response.data.error);
      return {
        status: false,
        message: "Failed to fetch products!",
      };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      status: false,
      error: "Error fetching products!",
    };
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

// Fetch Slider images for home page
export const getSliderImages = async (position: string) => {
  try {
    const response = await apiClient.get(
      `/front/sliders?product_type=1&position=${position}`
    );
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching product categories:`, error);
    throw error;
  }
};

export const getProductsByQueryParams = async (
  category: string[],
  paginate?: number,
  currentPage?: number
) => {
  try {
    const categoryString = category.length > 0 ? category.join(", ") : "";

    const requestBody: { category?: string; paginate?: number; page?: number } =
      {};
    if (categoryString) requestBody.category = categoryString;
    if (paginate) requestBody.paginate = paginate;
    if (currentPage) requestBody.page = currentPage;

    // const requestBody = categoryString ? { category: categoryString } : {};
    // console.log(requestBody)
    const response = await apiClient.post(`/front/products`, requestBody);

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching product with category ID ${category}:`);
    throw error;
  }
};

export const getProductsByCatSlug = async (
  slug: string,
  paginate?: number,
  currentPage?: number
) => {
  try {
    const requestBody: {
      category_slug?: string;
      paginate?: number;
      page?: number;
    } = {};
    if (slug) requestBody.category_slug = slug;
    if (paginate) requestBody.paginate = paginate;
    if (currentPage) requestBody.page = currentPage;

    // const requestBody = categoryString ? { category: categoryString } : {};
    // console.log(requestBody)
    const response = await apiClient.post(`/front/products`, requestBody);

    if (response.status) {
      return {
        status: true,
        data: response.data.data,
        message: "Products fetched successfully!",
      };
    } else {
      console.error("Error fetching products:", response.data.error);
      return {
        status: false,
        message: "Failed to fetch products!",
      };
    }
  } catch (error) {
    console.error(`Error fetching product with category slug ${slug}:`);
    return {
      status: false,
      error: "Error fetching products!",
    };
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
