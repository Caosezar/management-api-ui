import { useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

export function useAuth() {
  const [state] = useState<AuthState>({
    isAuthenticated: false, // Por padrão, o usuário não está autenticado
  });

  return {
    isAuthenticated: state.isAuthenticated,
  };
}
