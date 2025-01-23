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
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    //   throw error;
  }
};

export const updateUserPassword = async (token: string, data: PasswordChange) => {
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

export const updateProfile = async (token: string, formData: FormData) => {
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
