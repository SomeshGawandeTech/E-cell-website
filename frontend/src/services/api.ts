import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('coeta_ecell_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const sendOtpRequest = async (email: string) => {
  try {
    const res = await api.post('/auth/send-otp', { email });
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || 'Network error sending OTP',
    };
  }
};

export const verifyOtpRequest = async (email: string, otp: string, name?: string, role?: string) => {
  try {
    const res = await api.post('/auth/verify-otp', { email, otp, name, role });
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || 'Network error verifying OTP',
    };
  }
};
