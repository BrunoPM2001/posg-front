import {
  SideNavigation,
  SideNavigationProps,
} from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const items: ReadonlyArray<SideNavigationProps.Item> = [
  {
    type: "link",
    text: "Gestión de cursos",
    href: "#",
  },
  {
    type: "link",
    text: "Gestión de matrículas",
    href: "#",
  },
  {
    type: "link",
    text: "Gestión de exámenes de suficiencia",
    href: "#",
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
      activeHref={"/admin" + location.pathname}
      items={items}
    />
  );
}
