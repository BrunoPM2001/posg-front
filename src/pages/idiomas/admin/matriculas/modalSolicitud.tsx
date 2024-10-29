import {
  Box,
  Button,
  ColumnLayout,
  FormField,
  Grid,
  Input,
  Modal,
  Select,
  SelectProps,
  SpaceBetween,
} from "@cloudscape-design/components";
import useFormValidation from "../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";

interface ModalProps {
  close: () => void;
  matricula_id: number;
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

export default function ({ close, matricula_id, reload }: ModalProps) {
  //  Notifications
  const { pushNotification } = useContext(NotificationContext);

  //  Formulario
  const [detalles, setDetalles] = useState({});

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "idiomas/admin/matriculas/detalleMatricula",
      {
        params: {
          matricula_id,
        },
      }
    );
    const data = res.data;
    setDetalles(data);
  };

  const submit = async () => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header="Información personal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Rechazar solicitud
            </Button>
            <Button variant="primary" onClick={submit}>
              Aprobar matrícula
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <FormField label="Nombres" stretch>
          <Input value={detalles.matricula.nombres} readOnly />
        </FormField>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
          ]}
        >
          <FormField label="N° de documento" stretch>
            <Input value={formValues.dni} readOnly />
          </FormField>
          <FormField label="Correo" stretch>
            <Input value={formValues.correo} readOnly />
          </FormField>
          <FormField label="Celular" stretch>
            <Input value={formValues.celular} readOnly />
          </FormField>
        </Grid>
        <Box variant="h2">Información de la solicitud</Box>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 6 } },
            { colspan: { default: 12, xxs: 6 } },
            { colspan: { default: 12, xs: 3, xxs: 6 } },
            { colspan: { default: 12, xs: 3, xxs: 6 } },
            { colspan: { default: 12, xs: 3, xxs: 6 } },
            { colspan: { default: 12, xs: 3, xxs: 6 } },
          ]}
        >
          <div>
            <Box variant="awsui-key-label">Código de curso</Box>
            <div>{formValues.dni}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Detalles del curso</Box>
            <div>{formValues.dni}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Banco</Box>
            <div>{formValues.dni}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">N° de operación</Box>
            <div>{formValues.dni}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Monto</Box>
            <div>{formValues.dni}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha</Box>
            <div>{formValues.dni}</div>
          </div>
        </Grid>
      </SpaceBetween>
    </Modal>
  );
}
