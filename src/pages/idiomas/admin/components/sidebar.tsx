import {
  SideNavigation,
  SideNavigationProps,
} from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const items: ReadonlyArray<SideNavigationProps.Item> = [
  {
    type: "link",
    text: "Gestión de cursos",
    href: "/idiomas/admin/cursos",
  },
  {
    type: "link",
    text: "Gestión de docentes",
    href: "/idiomas/admin/docentes",
  },
  {
    type: "link",
    text: "Gestión de matrículas",
    href: "/idiomas/admin/matriculas",
  },
  {
    type: "link",
    text: "Gestión de exámenes de suficiencia",
    href: "/idiomas/admin/examenes",
  },
  {
    type: "link",
    text: "Notas de cursos",
    href: "#",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <SideNavigation
      header={{
        text: "Administrador",
        href: "/idiomas/admin",
      }}
      activeHref={location.pathname}
      items={items}
    />
  );
}
