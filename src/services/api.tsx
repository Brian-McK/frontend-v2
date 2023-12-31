import axios, { AxiosInstance, AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:3000/";

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

export const put = async <T,>(
  url: string,
  id: string,
  data: any
): Promise<IApiResponse<T>> => {
  const updateUrl = `${url}/${id}`;
  try {
    const response: IApiResponse<T> = await instance.put(updateUrl, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const del = async <T,>(
  url: string,
  id: string
): Promise<IApiResponse<T>> => {
  const deleteUrl = `${url}/${id}`;

  try {
    const response: IApiResponse<T> = await instance.delete(deleteUrl);
    return {
      data: response.data,
      status: response.status,
    };
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
