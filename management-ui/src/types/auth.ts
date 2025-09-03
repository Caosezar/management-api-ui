export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}
