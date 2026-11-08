import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SignupPage from "./features/auth/pages/SignupPage";
import AuthLayout from "./features/auth/components/AuthLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardLayout from "./features/tasks/components/DashboardLayout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", index: true, element: <SignupPage /> },
    ],
  },
  {
    // element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Navigate to="/dashboard/tasks" replace />,
          },
          // {path:"/dashboard/tasks",element: <TasksPage />}
          // { path: "/dashboard/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
