import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/auth-context";
import { loginApi } from "../features/auth/service/auth-service";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // Usar a função login do contexto com callback de navegação
      login({
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
      }, () => {
        // Callback executado após login bem-sucedido
        navigate("/app");
      });
      
      console.log("Login realizado com sucesso:", data.user);
    },
    onError: (error: Error) => {
      console.error("Erro no login:", error.message);
    },
  });
};