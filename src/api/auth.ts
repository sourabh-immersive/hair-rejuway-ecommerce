import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const forgotSendOtp = async (params: { phone: string; }) => {
  try {
    const response = await apiClient.post("/user/forgot", params);
    return response.data;
  } catch (error) {
    console.error("Forgot Error:", error);
    // throw error;
  }
};

export const forgotChangePassword = async (params: { user_id: string; reset_token: string; new_password: string; confirm_password: string; }) => {
  try {
    const formData = new FormData();
    formData.append("user_id", params.user_id);
    formData.append("reset_token", params.reset_token);
    formData.append("new_password", params.new_password);
    formData.append("confirm_password", params.confirm_password);
    
    const response = await apiClient.post("/user/forgot/submit", formData);
    return response.data;
  } catch (error) {
    console.error("Forgot Change Password Error:", error);
    // throw error;
  }
};

export interface RegistrationData {
  fullname: string;
  email: string;
  phone?: string;
  password: string;
  otp?: string;
}

export async function UserRegistration(data: RegistrationData) {
  try {
    const response = await apiClient.post("/user/registration", data);
    return response.data;
  } catch (err: any) {
    console.error(
      "Error during user registration:",
      err.response?.data || err.message || err
    );

    throw new Error(
      err.response?.data?.message ||
        "User registration failed. Please try again."
    );
  }
}

export async function UserRegistrationVerifyOtp(data: RegistrationData) {
  try {
    const response = await apiClient.post("/user/otp-verify", data);
    return response.data;
  } catch (err: any) {
    console.error(
      "Error during user registration:",
      err.response?.data || err.message || err
    );
    throw new Error(
      err.response?.data?.message ||
        "User registration failed. Please try again."
    );
  }
}

export const logout = async () => {
  localStorage.removeItem("token");
};

export async function authenticateGoogleUser(userD: any) {
  const response = await apiClient.post("/user/social-login", userD);
  if (response.status) {
    return {
      status: true,
      token: response.data.data.token
    }
  }
  // return true;
}
