import {
  Alert,
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FormField,
  Input,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import useFormValidation from "../../../../hooks/useFormValidation";

interface ModalProps {
  close: () => void;
}

interface FormValues {
  doc_numero: string;
  apellido1: string;
  fecha_nac: string;
}

const initialForm: FormValues = {
  doc_numero: "",
  apellido1: "",
  fecha_nac: "",
};

const formRules = {
  doc_numero: { required: true },
  apellido1: { required: true },
  fecha_nac: { required: true },
};

export default function ({ close }: ModalProps) {
  //  Formulario
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation<FormValues>(initialForm, formRules);

  const submit = () => {
    if (validateForm()) {
      console.log("Hi mom");
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Verificar si estoy inscrito"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={submit}>
              Verificar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <ColumnLayout columns={2}>
          <FormField
            label="N° de documento"
            description="DNI, pasaporte o carné de extranjería"
            errorText={formErrors.doc_numero}
          >
            <Input
              value={formValues.doc_numero}
              onChange={({ detail }) =>
                handleChange("doc_numero", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Primer apellido"
            description="Considerar las tildes en sus datos"
            errorText={formErrors.doc_numero}
          >
            <Input
              value={formValues.apellido1}
              onChange={({ detail }) => handleChange("apellido1", detail.value)}
            />
          </FormField>
        </ColumnLayout>
        <FormField
          label="Fecha de nacimiento"
          constraintText="Puede escribir el año de nacimiento antes de abrir el calendario para no demorar encontrando su fecha"
          errorText={formErrors.doc_numero}
        >
          <DatePicker
            placeholder="YYYY/MM/DD"
            value={formValues.fecha_nac}
            onChange={({ detail }) => handleChange("fecha_nac", detail.value)}
          />
        </FormField>
        <Alert header="Sí está registrado">Hi mom</Alert>
      </SpaceBetween>
    </Modal>
  );
}
