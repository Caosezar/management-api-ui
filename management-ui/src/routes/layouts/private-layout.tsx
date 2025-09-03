// src/routes/layouts/PrivateLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Hook de autenticação

export default function PrivateLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">Menu</aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
