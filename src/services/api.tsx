import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000/";
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define API request functions
export const get = async <T,>(url: string, params?: any): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.get(url, {
      params,
    });
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const post = async <T,>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.post(
      url,
      data
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const put = async <T,>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.put(
      url,
      data
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const patch = async <T,>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.patch(
      url,
      data
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const del = async <T,>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.delete(url);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Handle API errors
const handleApiError = (error: any): void => {
  if (error.response) {
    console.error("API Error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("API Request Error:", error.request);
  } else {
    console.error("API Error:", error.message);
  }
};

// Export the instance to use for custom requests or configurations
export default instance;
