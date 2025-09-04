import { useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
}

export function useAuth() {
  const [state] = useState<AuthState>({
    // false para fase de teste login
    isAuthenticated: true,
  });

  return {
    isAuthenticated: state.isAuthenticated,
  };
}
