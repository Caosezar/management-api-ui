import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const PublicLayout = lazy(() => import("../src/routes/layouts/public-layout"));
const PrivateLayout = lazy(
  () => import("../src/routes/layouts/private-layout")
);

// Public
const Login = lazy(() => import("./features/auth/login"));
const Register = lazy(() => import("./features/auth/register"));

// Private
const MainDashboardPage = lazy(() => import("../src/features/dashboard/page"));
// const Users = lazy(() => import("./routes/private/users"));
// const Reports = lazy(() => import("./routes/private/reports"));

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

// Route Configurations
const publicRoutes = {
  path: "/",
  element: <PublicLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ],
};

const privateRoutes = {
  path: "/app",
  element: <PrivateLayout />,
  children: [
    { index: true, element: <MainDashboardPage /> },
    // { path: "users", element: <Users /> },
    // { path: "reports", element: <Reports /> },
  ],
};

// Error Boundary
const ErrorBoundary = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-4">Algo deu errado.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
};

// Create Router
const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      publicRoutes,
      privateRoutes,
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);


export function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
