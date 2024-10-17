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
  codigo: string;
  reload: () => void;
}

export default function ({ close, codigo, reload }: ModalProps) {
  //  Notifications
  const { pushNotification } = useContext(NotificationContext);

  //  Functions
  const submit = async () => {
    const res = await axiosBase.delete("idiomas/admin/cursos/eliminarCurso", {
      params: {
        codigo,
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
      header="Eliminar curso"
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
      ¿Estás seguro de eliminar este curso? La acción no se puede deshacer
    </Modal>
  );
}
