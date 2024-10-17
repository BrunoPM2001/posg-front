import {
  ButtonDropdownProps,
  TopNavigation,
} from "@cloudscape-design/components";

const profileActions: ReadonlyArray<ButtonDropdownProps.ItemOrGroup> = [
  {
    id: "support-group",
    text: "Opciones",
    items: [
      {
        id: "perfil",
        text: "Mi perfil",
        href: "#",
      },
      {
        id: "updatePassword",
        text: "Cambiar contraseña",
        href: "#",
      },
    ],
  },
  {
    id: "signout",
    text: "Cerrar sesión",
    href: "/",
  },
];

export default function Navbar() {
  return (
    <>
      <div>
        <TopNavigation
          identity={{
            title: "Unidad de Idiomas",
            href: "#",
          }}
          utilities={[
            {
              type: "menu-dropdown",
              text: localStorage.getItem("User") as string,
              description: localStorage.getItem("Type") as string,
              iconName: "user-profile",
              items: profileActions,
              onItemClick: ({ detail }) => {
                //  Eliminar token de autenticación
                if (detail.id == "signout") {
                  localStorage.removeItem("Auth");
                }
              },
            },
          ]}
        />
      </div>
    </>
  );
}
