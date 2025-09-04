import type { LoginRequest, LoginResponse } from "../auth-types/types";

// Camada de serviço que simula uma chamada de API
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 segundos de delay

    // Simulação de sucesso
    if (credentials.email && credentials.password !== "") {
        return {
            user: {
                id: "1",
                name: "Administrador",
                email: credentials.email,
                role: "user",
            },
            token: "fake-jwt-token-12345",
            refreshToken: "fake-refresh-token-67890",
        };
    }

    throw new Error("Credenciais inválidas");
};
