import { createBrowserRouter, Navigate } from "react-router";
import MainPage from "./pages/MainPage";
import MainLayout from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="z/page/1" replace />,
      },
      {
        path: "z",
        element: <Navigate to="page/1" replace />,
      },
      {
        path: "d",
        element: <Navigate to="page/23" replace />,
      },
      {
        path: "z/page/:pageId",
        element: <MainPage />,
      },
      {
        path: "d/page/:pageId",
        element: <MainPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex items-center justify-center min-h-screen">
        <h1>404 - Page Not Found</h1>
      </div>
    ),
  },
]);
