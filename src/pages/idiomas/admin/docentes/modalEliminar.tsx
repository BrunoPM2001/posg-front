import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";
import { useContext } from "react";

interface ModalProps {
  close: () => void;
  dni: string;
  reload: () => void;
}

export default function ({ close, dni, reload }: ModalProps) {
  //  Notifications
  const { pushNotification } = useContext(NotificationContext);

  //  Functions
  const submit = async () => {
    const res = await axiosBase.delete("idiomas/admin/docentes/eliminar", {
      params: {
        dni,
      },
    });
    const data = res.data;
    pushNotification(data.state, data.message);
    reload();
    close();
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Eliminar docente"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={submit}>
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      ¿Estás seguro de eliminar a este docente? La acción no se puede deshacer
    </Modal>
  );
}
