import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    lazy: () => import("../pages/idiomas/index"),
  },
  {
    path: "hi",
    element: <>mom</>,
  },
];

export default routes;
