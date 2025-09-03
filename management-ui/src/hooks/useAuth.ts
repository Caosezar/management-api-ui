import { useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
}

export function useAuth() {
  const [state] = useState<AuthState>({
    // Temporariamente habilitado para desenvolvimento
    isAuthenticated: true,
  });

  return {
    isAuthenticated: state.isAuthenticated,
  };
}
