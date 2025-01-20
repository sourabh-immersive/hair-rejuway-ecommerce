import apiClient from './apiClient';

// Login API Call
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    const { token } = response.data;
    // Save token to localStorage (or cookie depending on your auth method)
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

// Logout API Call
export const logout = async () => {
  localStorage.removeItem('token');
  // Optionally call a logout API on the server
};


export async function authenticateGoogleUser(userD: any) {
  console.log('google login api post',userD)
  const res = await apiClient.post('/user/social-login', userD);
  console.log('res9999', res)
  // if (!res.ok) {
  //   console.error("Failed to save user to database");
  // }
  return true
}