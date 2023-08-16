import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000/";

let token = localStorage.getItem("token");

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log(response);

    if (response.data && Array.isArray(response.data)) {
      response.data = response.data.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface IApiResponse<T> {
  data: T;
  status: number;
}

// Define API request functions
export const get = async <T,>(
  url: string,
  params?: any
): Promise<IApiResponse<T>> => {
  try {
    const response: IApiResponse<T> = await instance.get(url, {
      params,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const post = async <T,>(
  url: string,
  data?: any
): Promise<IApiResponse<T>> => {
  try {
    const response: IApiResponse<T> = await instance.post(url, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const put = async <T,>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const patch = async <T,>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.patch(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const del = async <T,>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.delete(url);
    return response.data;
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
