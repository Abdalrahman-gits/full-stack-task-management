import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomeRedirect />,
  },
  {
    // element: <GuestRoute />,
    children: [
      // { path: "/login", element: <Login /> },
      // { path: "/signup", element: <Signup /> },
    ],
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
