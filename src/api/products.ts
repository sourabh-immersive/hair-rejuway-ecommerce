"use server";

import apiClient from "./apiClient";

export const getProducts = async (params?: { paginate?: number; type?: string; product_type?: string }) => {
  try {
    const requestBody = params ? { ...params } : {};

    const response = await apiClient.post("/front/products", requestBody);

    if (response.status) {
      return {
        status: true,
        data: response.data.data,
        pagination: response.data.pagination,
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

// Fetch ads banner
export const getAdsImages = async (position: string) => {
  try {
    const response = await apiClient.get(
      `/front/banners?type=1&position=${position}`
    );
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching product categories:`, error);
    throw error;
  }
};

// Fetch Pages content by slug
export const getPageBySlug = async (slug: string) => {
  try {
    const response = await apiClient.get(`/front/pages?slug=${slug}`);
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching product categories:`, error);
    // throw error;
  }
};

export const getProductsByQueryParams = async (
  category: string[],
  paginate?: number,
  currentPage?: number,
  type?: string
) => {
  try {
    const categoryString = category.length > 0 ? category.join(", ") : "";

    const requestBody: { category?: string; paginate?: number; page?: number; type?: string } =
      {};
    if (categoryString) requestBody.category = categoryString;
    if (paginate) requestBody.paginate = paginate;
    if (currentPage) requestBody.page = currentPage;
    if (type) requestBody.type = type;

    // const requestBody = categoryString ? { category: categoryString } : {};
    // console.log(requestBody)
    const response = await apiClient.post(`/front/products`, requestBody);

    if (response.status) {
      return {
        status: true,
        data: response.data.data,
        pagination: response.data.pagination,
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

export const getProductsByCatSlug = async (
  slug: string,
  paginate?: number,
  currentPage?: number,
  product_id?: string
) => {
  try {
    const requestBody: {
      category_slug?: string;
      paginate?: number;
      page?: number;
      product_id?: string;
    } = {};
    if (slug) requestBody.category_slug = slug;
    if (paginate) requestBody.paginate = paginate;
    if (currentPage) requestBody.page = currentPage;
    if (product_id) requestBody.product_id = product_id;

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

// Get products by ids
export const getProductsByIds = async (product_id?: string) => {
  try {
    const requestBody: {
      product_id?: string;
    } = {};
    if (product_id) requestBody.product_id = product_id;

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
    console.error(`Error fetching product with category slug`);
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
