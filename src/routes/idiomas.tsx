import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    lazy: () => import("../pages/idiomas/index"),
  },
  {
    path: "admin",
    children: [
      {
        path: "",
        lazy: () => import("../pages/idiomas/admin/login/index"),
      },
      {
        path: "cursos",
        lazy: () => import("../pages/idiomas/admin/cursos/index"),
      },
    ],
  },
];

export default routes;
