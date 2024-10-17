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
      {
        path: "docentes",
        lazy: () => import("../pages/idiomas/admin/docentes/index"),
      },
      {
        path: "matriculas",
        lazy: () => import("../pages/idiomas/admin/matriculas/index"),
      },
    ],
  },
];

export default routes;
