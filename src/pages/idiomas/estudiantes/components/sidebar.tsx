import {
  SideNavigation,
  SideNavigationProps,
} from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const items: ReadonlyArray<SideNavigationProps.Item> = [
  {
    type: "link",
    text: "Matrícula",
    href: "/idiomas/estudiante/matricula",
  },
  {
    type: "link",
    text: "Notas",
    href: "/idiomas/admin/docentes",
  },
  {
    type: "link",
    text: "Inscripción a examen",
    href: "/idiomas/admin/matriculas",
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
        text: "Estudiante",
        href: "/idiomas/estudiante",
      }}
      activeHref={location.pathname}
      items={items}
    />
  );
}
