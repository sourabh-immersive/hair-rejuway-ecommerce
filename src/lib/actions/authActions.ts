import axios from "axios";
import { loginFailure, loginRequest, loginSuccess, logout } from "../features/authSlice/authSlice";
import { AppThunk } from "../store";

export const loginUser =
  (credentials: { email: string; password: string }): AppThunk =>
  async (dispatch: (arg0: any) => void) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
        credentials
      );

      console.log(response.data.data.token);

      const user = {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        token: response.data.data.token,
      };

      // Save the token in local storage (optional)
      localStorage.setItem("authToken", user.token);

      dispatch(loginSuccess(user));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "An unexpected server error occurred";
      dispatch(loginFailure(errorMessage));
    }
  };

export const logoutUser = (): AppThunk => (dispatch) => {
  // Clear token from local storage (if applicable)
  localStorage.removeItem("authToken");

  dispatch(logout());
};