import {
  Alert,
  Button,
  Container,
  DatePicker,
  FileUpload,
  Form,
  FormField,
  Header,
  Input,
  RadioGroup,
  RadioGroupProps,
  Select,
  SelectProps,
  SpaceBetween,
} from "@cloudscape-design/components";
import BaseLayout from "../components/baseLayout";
import { useContext, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider";
import useFormValidation from "../../../../hooks/useFormValidation";

interface FormValues {
  curso: SelectProps.Option | null;
  banco: string;
  pago: string;
  monto: string;
  fecha: string;
  file: ReadonlyArray<File>;
}

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  i18nStrings: {
    uploadButtonText: (e: any) => (e ? "Cargar archivos" : "Cargar archivo"),
    dropzoneText: (e: any) =>
      e
        ? "Arrastre los archivos para cargarlos"
        : "Arrastre el archivo para cargarlo",
    removeFileAriaLabel: (e: any) => `Eliminar archivo ${e + 1}`,
    errorIconAriaLabel: "Error",
    limitShowFewer: "",
    limitShowMore: "",
  },
  accept: ".jpg, .jpeg, .png",
};

const bancos: ReadonlyArray<RadioGroupProps.RadioButtonDefinition> = [
  {
    value: "BCP",
    label: "Banco de Crédito de Perú - BCP",
    description:
      "El pago puede ser realizado por su banca móvil, web, agente, ventanilla o yape",
  },
  {
    value: "Pichincha",
    label: "Banco Pichincha",
    description: "El pago necesariamente lo tiene que realizar en ventanilla",
  },
];

const initialForm: FormValues = {
  curso: null,
  banco: bancos[0].value,
  pago: "",
  monto: "",
  fecha: "",
  file: [],
};

const formRules = {
  curso: { required: true },
  banco: { required: true },
  pago: { required: true },
  monto: { required: true },
  fecha: { required: true },
};

export function Component() {
  //  Notifications
  const { pushNotification } = useContext(NotificationContext);

  //  States
  const [cursos, setCursos] = useState<SelectProps.Options>([]);

  //  Formulario
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation<FormValues>(initialForm, formRules);

  return (
    <BaseLayout
      header={
        <Header
          variant="h1"
          description="Luego de solicitar su matrícula, tiene que esperar a que nuestro personal verifique su información para luego proceder con la aprobación de su solicitud."
        >
          Matrícula
        </Header>
      }
      contentType="form"
      breadcrumbs={[
        {
          text: "Estudiante",
          href: "#",
        },
        {
          text: "Cursos",
          href: "#",
        },
        {
          text: "Matrícula",
          href: "#",
        },
      ]}
    >
      <Form
        actions={
          <Button variant="primary" onClick={() => {}}>
            Solicitar mi matrícula
          </Button>
        }
      >
        <SpaceBetween size="xl">
          <Alert>
            Recuerde que si está matriculado actualmente en algún curso no podrá
            realizar una matrícula
          </Alert>
          <Container header={<Header>Datos académicos</Header>}>
            Se mostrará información de su última matrícula y datos generales
          </Container>
          <Container header={<Header>Información de matrícula</Header>}>
            <SpaceBetween size="l">
              <FormField
                label="Curso a escoger"
                errorText={formErrors.curso}
                description="Recuerde que solo aparecerán los cursos a los que puede acceder"
              >
                <Select
                  placeholder="Escoja una opción"
                  selectedOption={formValues.curso}
                  onChange={({ detail }) =>
                    handleChange("curso", detail.selectedOption)
                  }
                  options={cursos}
                  statusType={cursos?.length === 0 ? "loading" : "finished"}
                  loadingText="Cargando opciones"
                />
              </FormField>
              <FormField
                label="Entidad bancaria"
                errorText={formErrors.banco}
                description="Banco en el que realizó el pago por este servicio"
              >
                <RadioGroup
                  value={formValues.banco}
                  onChange={({ detail }) => handleChange("banco", detail.value)}
                  items={bancos}
                />
              </FormField>
              <FormField
                label="N° de operación"
                errorText={formErrors.pago}
                description="Secuencia de pago o n° de operación que figura en su comprobante de pago"
              >
                <Input
                  placeholder="Escriba el n° de operación"
                  value={formValues.pago}
                  onChange={({ detail }) => handleChange("pago", detail.value)}
                />
              </FormField>
              <FormField
                label="Monto del pago"
                errorText={formErrors.monto}
                description="Monto que figura en su comprobante de pago"
              >
                <Input
                  placeholder="Ingrese la cantidad del voucher"
                  type="number"
                  value={formValues.monto}
                  onChange={({ detail }) => handleChange("monto", detail.value)}
                />
              </FormField>
              <FormField
                label="Fecha de pago"
                errorText={formErrors.fecha}
                description="Fecha en la que realizó el pago de servicio"
              >
                <DatePicker
                  placeholder="AAAA/MM/DD"
                  value={formValues.fecha}
                  onChange={({ detail }) => handleChange("fecha", detail.value)}
                />
              </FormField>
              <FormField
                label="Voucher de pago"
                description="Foto de su comprobante de pago (si ha realizado el pago a través de la plataforma de San Market puede omitir la carga de este archivo)"
              >
                <FileUpload
                  {...propsRepetidas}
                  value={formValues.file}
                  onChange={({ detail }) => handleChange("file", detail.value)}
                />
              </FormField>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Form>
    </BaseLayout>
  );
}
