import { useMutation } from "@tanstack/react-query";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
  token: string;
  refreshToken: string;
}

const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 segundos de delay

  if (
    credentials.email === "admin@test.com" &&
    credentials.password === "123456"
  ) {
    return {
      user: {
        id: "1",
        name: "Administrador",
        email: credentials.email,
        role: "admin",
      },
      token: "fake-jwt-token-12345",
      refreshToken: "fake-refresh-token-67890",
    };
  }

  throw new Error("Credenciais inválidas");
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data.token);
      localStorage.setItem("refresh-token", data.refreshToken);

      console.log("Login realizado com sucesso:", data.user);
    },
    onError: (error) => {
      console.error("Erro no login:", error.message);
    },
  });
};
