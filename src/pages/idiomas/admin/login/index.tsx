import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  ContentLayout,
  CopyToClipboard,
  Form,
  FormField,
  Grid,
  Header,
  Input,
  Link,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState, FormEvent } from "react";
import useFormValidation from "../../../../hooks/useFormValidation";

interface FormValues {
  username: string;
  password: string;
}

const initialForm: FormValues = {
  username: "",
  password: "",
};

const formRules = {
  username: { required: true },
  password: { required: true },
};

export function Component() {
  //  States
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState(false);

  //  Formulario
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation<FormValues>(initialForm, formRules);

  //  Functions
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      console.log("hi mom");
    }
  };

  return (
    <ContentLayout
      defaultPadding
      maxContentWidth={700}
      headerVariant="high-contrast"
      header={
        <Box padding={{ vertical: "m" }}>
          <Grid
            gridDefinition={[
              { colspan: { default: 12, s: 8 } },
              { colspan: { default: 12, s: 4 } },
            ]}
          >
            <div>
              <Box variant="h1">Módulo para administrativos</Box>
              <Box
                variant="p"
                color="text-body-secondary"
                margin={{ top: "xxs", bottom: "s" }}
              >
                Acceso limitado al personal de la Unidad de Idiomas, dentro de
                este módulo podrá gestionar cursos, exámenes de suficiencia,
                matrículas y mucho mas.
              </Box>
              <div>
                Desarrollado por:{" "}
                <Link variant="primary" href="#">
                  Unidad de informática - DGEP
                </Link>
              </div>
            </div>

            <Box>
              <SpaceBetween size="s">
                <Box>Reportar un error</Box>
                <CopyToClipboard
                  copyButtonAriaLabel="Copiar correo"
                  copyErrorText="Error al copiar correo"
                  copySuccessText="Correo copiado"
                  textToCopy="informatica.posgrado@unmsm.edu.pe"
                  variant="inline"
                />
              </SpaceBetween>
            </Box>
          </Grid>
        </Box>
      }
    >
      <Container
        header={<Header>Iniciar sesión</Header>}
        footer={
          <SpaceBetween size="s">
            {alert && (
              <Alert
                header="Credenciales incorrectas"
                type="error"
                dismissible
                onDismiss={() => setAlert(false)}
              />
            )}
          </SpaceBetween>
        }
      >
        <form onSubmit={handleLogin}>
          <Form
            actions={
              <Button variant="primary" loading={loading}>
                Iniciar Sesión
              </Button>
            }
          >
            <SpaceBetween size="s">
              <FormField
                label="Usuario"
                errorText={formErrors.username}
                stretch
              >
                <Input
                  onChange={({ detail }) =>
                    handleChange("username", detail.value)
                  }
                  value={formValues.username}
                  placeholder="Escriba su nombre de usuario"
                />
              </FormField>
              <FormField
                label="Contraseña"
                errorText={formErrors.password}
                stretch
              >
                <Input
                  onChange={({ detail }) =>
                    handleChange("password", detail.value)
                  }
                  value={formValues.password}
                  type={checked ? "text" : "password"}
                  placeholder="******"
                />
              </FormField>
              <div>
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                >
                  Mostrar contraseña
                </Checkbox>
              </div>
            </SpaceBetween>
          </Form>
        </form>
      </Container>
    </ContentLayout>
  );
}
