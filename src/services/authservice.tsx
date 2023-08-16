import { IApiResponse, post } from "./api";

interface IAuthenticatedUser {
  username: string;
  jwtToken: string;
  refreshToken: string;
}

export interface IAuthenticationResponse {
  message: string;
  authenticated: IAuthenticatedUser;
}

export type IAuthenticationRequest = {
  username: string;
  password: string;
};

export async function loginUser(
  credentials: IAuthenticationRequest
): Promise<IAuthenticationResponse> {
  try {
    const authResponse = await post<IAuthenticationResponse>(
      "/auth/login",
      credentials
    );

    return authResponse.data;
  } catch (error) {
    console.error("Error authenticating user: ", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const authResponse = await post("/auth/logout");

    return authResponse.data;
  } catch (error) {
    console.error("Error authenticating user: ", error);
    throw error;
  }
}
