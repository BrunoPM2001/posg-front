import "@cloudscape-design/global-styles/index.css";
import IdiomasRoutes from "./routes/idiomas";
import AdmisionRoutes from "./routes/admision";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./providers/notificationProvider";

const baseRouter = createBrowserRouter([
  {
    path: "/idiomas",
    children: IdiomasRoutes,
  },
  {
    path: "/admision",
    children: AdmisionRoutes,
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
]);

export default function App() {
  return (
    <NotificationProvider>
      <RouterProvider router={baseRouter} />
    </NotificationProvider>
  );
}
