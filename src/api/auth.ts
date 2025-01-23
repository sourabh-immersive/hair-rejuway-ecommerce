import apiClient from "./apiClient";

// Login API Call
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    const { token } = response.data;
    // Save token to localStorage (or cookie depending on your auth method)
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Register User to site
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
    console.log("register user response:", response.data);

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
    console.log("register user response when verify:", response.data);

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

// Logout API Call
export const logout = async () => {
  localStorage.removeItem("token");
  // Optionally call a logout API on the server
};

export async function authenticateGoogleUser(userD: any) {
  // console.log('google login api post',userD)
  const res = await apiClient.post("/user/social-login", userD);
  // console.log('res9999', res)
  // if (!res.ok) {
  //   console.error("Failed to save user to database");
  // }
  return true;
}
