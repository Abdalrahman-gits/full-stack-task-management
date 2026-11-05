import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import SignupPage from "./features/auth/pages/SignupPage";
import AuthLayout from "./features/auth/components/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomeRedirect />,
  },
  {
    // element: <GuestRoute />,
    element: <AuthLayout />,
    children: [{ path: "/signup", element: <SignupPage /> }],
  },
  {
    // element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        // element: <DashboardLayout />,
        children: [
          // { index: true, element: <Tasks /> },
          // { path: "profile", element: <Profile /> },
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
