import { post } from "./api";

interface AuthenticatedUser {
  username: string;
  jwtToken: string;
  refreshToken: string;
}

export interface AuthenticationResponse {
  message: string;
  authenticated: AuthenticatedUser;
}

export type AuthenticationRequest = {
  username: string;
  password: string;
};

export async function loginUser(
  credentials: AuthenticationRequest
): Promise<AuthenticationResponse> {
  try {
    const authResponse = await post<AuthenticationResponse>(
      "/auth/login",
      credentials
    );

    return authResponse.data;
  } catch (error) {
    console.error("Error authenticating user: ", error);
    throw error;
  }
}
