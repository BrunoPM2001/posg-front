import {
  Alert,
  Box,
  Button,
  Container,
  ContentLayout,
  Form,
  FormField,
  Grid,
  Input,
  Link,
  SpaceBetween,
  Tabs,
} from "@cloudscape-design/components";
import useFormValidation from "../../../hooks/useFormValidation";
import { useState } from "react";
import ModalVerInscripcion from "./components/modalVerInscripcion";

interface FormValues {
  operacion: string;
}

const initialForm: FormValues = {
  operacion: "",
};

const formRules = {
  operacion: { required: true },
};

const Header = () => {
  return (
    <Box padding={{ vertical: "l" }}>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 8 } },
          { colspan: { default: 12, xs: 4 } },
        ]}
      >
        <div>
          <Box variant="h1">Dirección General de Estudios de Posgrado</Box>
          <Box variant="h3" color="text-body-secondary">
            Proceso de Admisión 2025-I
          </Box>
          <Box variant="h3">Maestrías y Doctorados</Box>
          <Box margin={{ top: "xs" }}>
            Regresar a la{" "}
            <Link variant="primary" href="#">
              página principal de posgrado
            </Link>
          </Box>
        </div>

        <div>
          <SpaceBetween size="s">
            <Box variant="p" color="text-label">
              Recuerde que el pago a este proceso se realiza únicamente a través
              de la plataforma de San Market.
            </Box>
            <Button variant="primary" fullWidth={true}>
              San Market
            </Button>
            <Button fullWidth={true}>Tarifario</Button>
          </SpaceBetween>
        </div>
      </Grid>
    </Box>
  );
};

export function Component() {
  //  States
  const [modal, setModal] = useState("");

  //  Formulario
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation<FormValues>(initialForm, formRules);

  const submit = () => {
    if (validateForm()) {
      console.log("Formulario válido");
    }
  };

  return (
    <ContentLayout
      defaultPadding
      disableOverlap
      headerVariant="high-contrast"
      maxContentWidth={1200}
      header={<Header />}
    >
      <Box padding={{ vertical: "xl" }}>
        <SpaceBetween size="xl">
          <Box variant="h1">Inscripción al proceso de admisión vigente</Box>
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 8 } },
              { colspan: { default: 12, xs: 4 } },
            ]}
          >
            <SpaceBetween size="m">
              <Alert type="warning" header="Inscripción al proceso de admisión">
                Bienvenido a la plataforma para inscribirse al proceso de
                admisión de posgrado de la Universidad Nacional Mayor de San
                Marcos: <br />
                Recuerde que necesita realizar el pago correspondiente al{" "}
                <Link href="#">tarifario</Link> en la plataforma de{" "}
                <Link href="#">San Market</Link> , una vez lo haya realizado
                coloque el n° de operación para validarlo y empezar con su
                inscripción.
              </Alert>
              <Alert
                action={
                  <Button
                    variant="primary"
                    onClick={() => setModal("verInscripcion")}
                  >
                    Verificar inscripción
                  </Button>
                }
              >
                Si ya se inscribió y no recuerda cuál es su código de postulante
                puede verificar su registro al proceso de admisión aquí.
              </Alert>
            </SpaceBetween>

            <Container fitHeight>
              <Form
                header={<Box variant="h3">Validar mi pago</Box>}
                actions={
                  <Button variant="primary" onClick={submit}>
                    Validar mi pago
                  </Button>
                }
              >
                <FormField
                  label="N° de operación"
                  description="Ingrese el código único que generó en San Market"
                  errorText={formErrors.operacion}
                >
                  <Input
                    placeholder="Escriba su n° de operación"
                    value={formValues.operacion}
                    onChange={({ detail }) =>
                      handleChange("operacion", detail.value)
                    }
                  />
                </FormField>
              </Form>
            </Container>
          </Grid>

          <Tabs
            tabs={[
              {
                id: "pasos",
                label: "Pasos descritos",
                content: (
                  <SpaceBetween size="m">
                    <Box variant="h2">
                      Puede realizar su pago siguiendo estos pasos
                    </Box>
                    <div>
                      <Box variant="awsui-key-label">
                        1. Ingresar a la plataforma de San Market
                      </Box>
                      <div>
                        San Market es la plataforma de pagos de la UNMSM,{" "}
                        <Link variant="primary" href="#" external>
                          ir a San Market
                        </Link>
                      </div>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">
                        2. Ubicar en el catálogo la unidad de DGEP
                      </Box>
                      Imágenes y pasos adicionales uwu
                    </div>
                  </SpaceBetween>
                ),
              },
              {
                id: "tutorial",
                label: "Video tutorial",
                content: (
                  <Container
                    media={{
                      content: (
                        <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY" />
                      ),
                      height: 400,
                      position: "top",
                    }}
                    fitHeight
                  >
                    <SpaceBetween direction="vertical" size="s">
                      <SpaceBetween direction="vertical" size="xxs">
                        <Box variant="h2">Tutorial para el pago</Box>
                      </SpaceBetween>
                      <Box>
                        Puede seguir el siguiente tutorial paso a paso para
                        registrarse en San Market, realizar el pago para
                        admisión, validar su pago y completar su inscripción.
                      </Box>
                    </SpaceBetween>
                  </Container>
                ),
              },
            ]}
          />
        </SpaceBetween>
      </Box>
      {modal === "verInscripcion" && (
        <ModalVerInscripcion close={() => setModal("")} />
      )}
    </ContentLayout>
  );
}
