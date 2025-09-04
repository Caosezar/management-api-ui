import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/auth-context";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      // Callback executado após logout bem-sucedido
      navigate("/login", { replace: true });
    });
  };

  return { logout: handleLogout };
};