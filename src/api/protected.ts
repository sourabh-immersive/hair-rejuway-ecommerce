"use server";

import { PasswordChange } from "@/app/(protected)/account-password/changepassword";
import apiClient from "./apiClient";

export const getProfileDetails = async (token: string) => {
  try {
    const response = await apiClient.get(`/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("response getProfileDetails", response);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    //   throw error;
  }
};

interface Attribute  {
  attribute_id?: string,
  attribute_title: string,
  attribute_value: string
}

interface AddToCart {
    product_id: string,
    product_qty: number,  
    variation: Attribute[]
}

export const addToCart = async (data: AddToCart[], token: string | undefined) => {
  console.log('data', data , token)
  try {
    const response = await apiClient.post(`/user/addToCart`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("resposnse when addto cartt api", response.data);
    return response.data;
  } catch (error) {
    // console.error("Error adding product to cart:", error);
    console.log("Error adding product to cart: custom");
    //   throw error;
  }
};

export const updateUserPassword = async (
  token: string,
  data: PasswordChange
) => {
  try {
    const response = await apiClient.post(`/user/password/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    //   throw error;
  }
};

export const addUpdateWishlist = async (token: string, id: string) => {
  try {
    const response = await apiClient.post(`/user/wishlist/add`, {
        'product_id': id
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('addUpdateWishlist', response.data)
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    //   throw error;
  }
};

export const getCart = async (token: string) => {
  try {
    const response = await apiClient.post(`/user/cartList`, [], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('getCart', response.data)
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    //   throw error;
  }
};

export const doCheckout = async (token: string, data: any) => {
  try {
    const response = await apiClient.post(`/front/checkout`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('getCart', response.data)
    return response.data;
  } catch (error) {
    console.error("Error in checkout:", error);
    //   throw error;
  }
};

export const getOrders = async (token: string) => {
  try {
    const response = await apiClient.post(`/user/orders`, [], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('getCart', response.data)
    return response.data;
  } catch (error) {
    console.error("Error in checkout:", error);
    //   throw error;
  }
};

export const getOrderDetails = async (token: string, orderId: number) => {
  try {
    const response = await apiClient.get(`/user/order/${orderId}/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('getCart', response.data)
    return response.data;
  } catch (error) {
    console.error("Error in checkout:", error);
    //   throw error;
  }
};

// export const addUpdateWishlist = async (token: string, id: string | string[]) => {
//   try {
//     // Convert id to a comma-separated string if it's an array
//     const productIds = Array.isArray(id) ? id.join(",") : id;

//     const response = await apiClient.post(
//       "/user/wishlist/add", // Your API endpoint
//       {
//         product_id: productIds, // Send product IDs as a comma-separated string
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log('addUpdateWishlist response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error in addUpdateWishlist:", error);
//     throw error; // Re-throw the error for handling in the calling function
//   }
// };

export const getWishlist = async (token: string) => {
  try {
    const response = await apiClient.get(`/user/wishlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    //   throw error;
  }
};

export const updateProfile = async (token: string, formData: FormData) => {
  console.log('formData 22222', formData)
  try {
    const response = await apiClient.post(`/user/profile/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
