import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { User } from "../../types/auth";
import type { AuthData } from "../../features/auth/auth-types/types";
import { useLocalStorage } from "../../hooks/use-local-storage";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isUser: boolean;
    login: (data: AuthData, onSuccess?: () => void) => void;
    logout: (onSuccess?: () => void) => void;
    hasPermission: (permission: string) => boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authData, setAuthData] = useLocalStorage<AuthData | null>("authData", null);

    // Extrair dados do authData
    const user = authData?.user || null;
    const token = authData?.token || null;
    // const isAuthenticated = !!authData;
     const isAuthenticated = true;

    // Sistema de permissões
    const rolePermissions = {
        admin: ['dashboard', 'lifecycle', 'analytics', 'projects', 'team', 'users', 'reports'],
        user: ['dashboard', 'projects'],
    };

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;
        return rolePermissions[user.role]?.includes(permission) || false;
    };

    const isAdmin = user?.role === 'admin';
    const isUser = user?.role === 'user';

    // Função de login com callback opcional
    const login = (data: AuthData, onSuccess?: () => void) => {
        setAuthData(data);
        // Chama o callback se fornecido
        if (onSuccess) {
            onSuccess();
        }
    };

    // Função de logout com callback opcional
    const logout = (onSuccess?: () => void) => {
        setAuthData(null);
        // Chama o callback se fornecido
        if (onSuccess) {
            onSuccess();
        }
    };

    const value = useMemo(
        () => ({
            user,
            token,
            isAuthenticated,
            isAdmin,
            isUser,
            login,
            logout,
            hasPermission,
        }),
        [user, token, isAuthenticated, isAdmin, isUser]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};