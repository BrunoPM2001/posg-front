import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    lazy: () => import("../pages/admision/index"),
  },
  {
    path: "inscripcion",
    lazy: () => import("../pages/admision/inscripcion"),
  },
];

export default routes;
