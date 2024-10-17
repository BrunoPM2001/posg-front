import {
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  Select,
  SelectProps,
  SpaceBetween,
} from "@cloudscape-design/components";
import useFormValidation from "../../../../hooks/useFormValidation";
import { useContext } from "react";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";

interface ModalProps {
  close: () => void;
  reload: () => void;
}

interface FormValues {
  dni: string;
  paterno: string;
  materno: string;
  nombres: string;
  celular: string;
  correo: string;
  estado: SelectProps.Option;
}

const initialForm: FormValues = {
  dni: "",
  paterno: "",
  materno: "",
  nombres: "",
  celular: "",
  correo: "",
  estado: { value: "1", label: "Activo" },
};

const formRules = {
  dni: { required: true },
  paterno: { required: true },
  materno: { required: true },
  nombres: { required: true },
  celular: { required: true },
  correo: { required: true },
  estado: { required: true },
};

const estados: SelectProps.Options = [
  { value: "0", label: "Inactivo" },
  { value: "1", label: "Activo" },
];

export default function ({ close, reload }: ModalProps) {
  //  Notifications
  const { pushNotification } = useContext(NotificationContext);

  //  Formulario
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation<FormValues>(initialForm, formRules);

  //  Functions
  const submit = async () => {
    if (validateForm()) {
      const res = await axiosBase.post("idiomas/admin/docentes/crear", {
        dni: formValues.dni,
        paterno: formValues.paterno,
        materno: formValues.materno,
        nombres: formValues.nombres,
        celular: formValues.celular,
        correo: formValues.correo,
        estado: formValues.estado.value,
      });
      const data = res.data;
      pushNotification(data.state, data.message);
      reload();
      close();
    }
  };

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header="Agregar docente"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={submit}>
              Registrar docente
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <ColumnLayout columns={3}>
          <FormField label="Dni" errorText={formErrors.dni} stretch>
            <Input
              placeholder="N° de documento"
              value={formValues.dni}
              onChange={({ detail }) => handleChange("dni", detail.value)}
            />
          </FormField>
          <FormField label="Paterno" errorText={formErrors.paterno} stretch>
            <Input
              placeholder="Primer apellido"
              value={formValues.paterno}
              onChange={({ detail }) => handleChange("paterno", detail.value)}
            />
          </FormField>
          <FormField label="Materno" errorText={formErrors.materno} stretch>
            <Input
              placeholder="Segundo apellido"
              value={formValues.materno}
              onChange={({ detail }) => handleChange("materno", detail.value)}
            />
          </FormField>
        </ColumnLayout>
        <FormField label="Nombres" errorText={formErrors.nombres} stretch>
          <Input
            placeholder="Nombres del docente"
            value={formValues.nombres}
            onChange={({ detail }) => handleChange("nombres", detail.value)}
          />
        </FormField>
        <ColumnLayout columns={3}>
          <FormField
            label="N° de celular"
            errorText={formErrors.celular}
            stretch
          >
            <Input
              value={formValues.celular}
              onChange={({ detail }) => handleChange("celular", detail.value)}
            />
          </FormField>
          <FormField label="Correo" errorText={formErrors.correo} stretch>
            <Input
              value={formValues.correo}
              onChange={({ detail }) => handleChange("correo", detail.value)}
            />
          </FormField>
          <FormField label="Estado" errorText={formErrors.estado} stretch>
            <Select
              selectedOption={formValues.estado}
              onChange={({ detail }) =>
                handleChange("estado", detail.selectedOption)
              }
              options={estados}
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Modal>
  );
}
