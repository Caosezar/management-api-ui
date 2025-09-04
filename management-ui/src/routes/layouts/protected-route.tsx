import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/auth-context';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermission?: string;
    adminOnly?: boolean;
}

export const ProtectedRoute = ({
    children,
    requiredPermission,
    adminOnly
}: ProtectedRouteProps) => {
    const { isAuthenticated, hasPermission, isAdmin } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/app" replace />;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/app" replace />;
    }

    return <>{children}</>;
};