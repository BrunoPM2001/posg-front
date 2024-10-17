import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FormField,
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
  reload: () => void;
}

interface Detalles {
  idiomas?: SelectProps.Options;
  programas?: SelectProps.Options;
  niveles?: SelectProps.Options;
  horarios?: SelectProps.Options;
}

interface FormValues {
  idioma: SelectProps.Option | null;
  programa: SelectProps.Option | null;
  nivel: SelectProps.Option | null;
  horario: SelectProps.Option | null;
  mes: string;
  modalidad: SelectProps.Option | null;
  seccion: SelectProps.Option | null;
  fecha_inicio: string;
  fecha_fin: string;
}

const initialForm: FormValues = {
  idioma: null,
  programa: null,
  nivel: null,
  horario: null,
  mes: "",
  modalidad: null,
  seccion: null,
  fecha_inicio: "",
  fecha_fin: "",
};

const formRules = {
  idioma: { required: true },
  programa: { required: true },
  nivel: { required: true },
  horario: { required: true },
  mes: { required: true },
  modalidad: { required: true },
  seccion: { required: true },
  fecha_inicio: { required: true },
  fecha_fin: { required: true },
};

const modalidades: SelectProps.Options = [
  { value: "REGULAR" },
  { value: "INTENSIVO" },
  { value: "SUPERINTENSIVO" },
  { value: "REPASO" },
  { value: "REGU-ESPECIAL" },
  { value: "SUPER-ESPECIAL" },
];

const secciones: SelectProps.Options = [
  { value: "Salón 1" },
  { value: "Salón 2" },
];

export default function ({ close, reload }: ModalProps) {
  //  Notifications
  const { pushNotification } = useContext(NotificationContext);

  //  States
  const [detalles, setDetalles] = useState<Detalles>({
    idiomas: [],
    programas: [],
    niveles: [],
    horarios: [],
  });

  //  Formulario
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation<FormValues>(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("idiomas/admin/cursos/crearCursoInfo");
    const data = res.data;
    setDetalles(data);
  };

  const submit = async () => {
    if (validateForm()) {
      const res = await axiosBase.post("idiomas/admin/cursos/crearCurso", {
        idioma_id: formValues.idioma?.value,
        programa_id: formValues.programa?.value,
        nivel_id: formValues.nivel?.value,
        horario_id: formValues.horario?.value,
        mes: formValues.mes,
        modalidad: formValues.modalidad?.value,
        fecha_inicio: formValues.fecha_inicio,
        fecha_fin: formValues.fecha_fin,
        seccion: formValues.seccion?.value,
      });
      const data = res.data;
      pushNotification(data.state, data.message);
      reload();
      close();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header="Agregar curso"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={submit}>
              Registrar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <ColumnLayout columns={3}>
          <FormField label="Idioma" errorText={formErrors.idioma} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.idioma}
              onChange={({ detail }) =>
                handleChange("idioma", detail.selectedOption)
              }
              options={detalles.idiomas}
              statusType={
                detalles.idiomas?.length === 0 ? "loading" : "finished"
              }
              loadingText="Cargando listado"
            />
          </FormField>
          <FormField label="Programa" errorText={formErrors.programa} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.programa}
              onChange={({ detail }) =>
                handleChange("programa", detail.selectedOption)
              }
              options={detalles.programas}
              statusType={
                detalles.idiomas?.length === 0 ? "loading" : "finished"
              }
              loadingText="Cargando listado"
            />
          </FormField>
          <FormField label="Nivel" errorText={formErrors.nivel} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.nivel}
              onChange={({ detail }) =>
                handleChange("nivel", detail.selectedOption)
              }
              options={detalles.niveles}
              statusType={
                detalles.idiomas?.length === 0 ? "loading" : "finished"
              }
              loadingText="Cargando listado"
            />
          </FormField>
        </ColumnLayout>
        <FormField label="Horario" errorText={formErrors.horario} stretch>
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.horario}
            onChange={({ detail }) =>
              handleChange("horario", detail.selectedOption)
            }
            options={detalles.horarios}
            statusType={detalles.horarios?.length == 0 ? "loading" : "finished"}
            loadingText="Cargando listado"
          />
        </FormField>
        <ColumnLayout columns={2}>
          <FormField label="Modalidad" errorText={formErrors.modalidad} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.modalidad}
              onChange={({ detail }) =>
                handleChange("modalidad", detail.selectedOption)
              }
              options={modalidades}
            />
          </FormField>
          <FormField label="Sección" errorText={formErrors.seccion} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.seccion}
              onChange={({ detail }) =>
                handleChange("seccion", detail.selectedOption)
              }
              options={secciones}
            />
          </FormField>
        </ColumnLayout>
        <ColumnLayout columns={3}>
          <FormField
            label="Fecha de inicio"
            errorText={formErrors.fecha_inicio}
            stretch
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_inicio}
              onChange={({ detail }) =>
                handleChange("fecha_inicio", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha de fin"
            errorText={formErrors.fecha_fin}
            stretch
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_fin}
              onChange={({ detail }) => handleChange("fecha_fin", detail.value)}
            />
          </FormField>
          <FormField
            label="Año y mes"
            constraintText="Recuerde que en base a este campo se determinan los primeros 4 dígitos del código de curso"
            errorText={formErrors.mes}
            stretch
          >
            <DatePicker
              placeholder="YYYY/MM"
              granularity="month"
              value={formValues.mes}
              onChange={({ detail }) => handleChange("mes", detail.value)}
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Modal>
  );
}
