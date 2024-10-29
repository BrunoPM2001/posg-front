import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FormField,
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
import { Autosuggest } from "@cloudscape-design/components";
import { Grid } from "@cloudscape-design/components";

interface ModalProps {
  close: () => void;
  codigo: string;
  reload: () => void;
}

interface Detalles {
  idiomas?: SelectProps.Options;
  programas?: SelectProps.Options;
  niveles?: SelectProps.Options;
  horarios?: SelectProps.Options;
  docentes?: SelectProps.Options;
}

interface FormValues {
  codigo: string;
  idioma: SelectProps.Option | null;
  programa: SelectProps.Option | null;
  nivel: SelectProps.Option | null;
  horario: SelectProps.Option | null;
  mes: string;
  modalidad: SelectProps.Option | null;
  seccion: SelectProps.Option | null;
  fecha_inicio: string;
  fecha_fin: string;
  estado: SelectProps.Option | null;
  docente_dni: string;
}

const initialForm: FormValues = {
  codigo: "",
  idioma: null,
  programa: null,
  nivel: null,
  horario: null,
  mes: "",
  modalidad: null,
  seccion: null,
  fecha_inicio: "",
  fecha_fin: "",
  estado: null,
  docente_dni: "",
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

const estados: SelectProps.Options = [
  { value: "0", label: "Inhabilitado" },
  { value: "1", label: "En matrícula" },
  { value: "2", label: "En curso" },
  { value: "3", label: "Cerrado" },
];

export default function ({ close, codigo, reload }: ModalProps) {
  //  Notifications
  const { pushNotification } = useContext(NotificationContext);

  //  States
  const [value, setValue] = useState("");
  const [detalles, setDetalles] = useState<Detalles>({
    idiomas: [],
    programas: [],
    niveles: [],
    horarios: [],
    docentes: [],
  });

  //  Formulario
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation<FormValues>(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("idiomas/admin/cursos/editCursoInfo", {
      params: {
        codigo,
      },
    });
    const data = res.data;
    setDetalles(data.info);
    handleChange(
      "idioma",
      data.info.idiomas.find(
        (opt: SelectProps.Option) => opt.label == data.curso.idioma
      )
    );
    handleChange(
      "programa",
      data.info.programas.find(
        (opt: SelectProps.Option) => opt.label == data.curso.programa
      )
    );
    handleChange(
      "nivel",
      data.info.niveles.find(
        (opt: SelectProps.Option) => opt.label == data.curso.nivel
      )
    );
    handleChange(
      "horario",
      data.info.horarios.find(
        (opt: SelectProps.Option) => opt.label == data.curso.horario
      )
    );
    handleChange(
      "modalidad",
      modalidades.find((opt) => opt.value == data.curso.modalidad)
    );
    handleChange(
      "seccion",
      secciones.find((opt) => opt.value == data.curso.seccion)
    );
    handleChange(
      "estado",
      estados.find((opt) => opt.value == data.curso.estado)
    );
    handleChange("fecha_inicio", data.curso.fecha_inicio);
    handleChange("fecha_fin", data.curso.fecha_fin);
    handleChange("mes", data.curso.mes);
    handleChange("codigo", data.curso.codigo);
    if (data.curso.docente_dni) {
      handleChange("docente_dni", data.curso.docente_dni);
      setValue(data.curso.docente_dni);
    }
  };

  const submit = async () => {
    if (validateForm()) {
      const res = await axiosBase.put("idiomas/admin/cursos/actualizarCurso", {
        codigo: codigo,
        idioma_id: formValues.idioma?.value,
        programa_id: formValues.programa?.value,
        nivel_id: formValues.nivel?.value,
        horario_id: formValues.horario?.value,
        modalidad: formValues.modalidad?.value,
        seccion: formValues.seccion?.value,
        fecha_inicio: formValues.fecha_inicio,
        fecha_fin: formValues.fecha_fin,
        mes: formValues.mes,
        estado: formValues.estado?.value,
        docente_dni: formValues.docente_dni,
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
      header="Editar curso"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={submit}>
              Guardar información
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 4 } },
            { colspan: { default: 12, xxs: 4 } },
            { colspan: { default: 12, xxs: 4 } },
          ]}
        >
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
        </Grid>
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
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 4 } },
            { colspan: { default: 12, xxs: 4 } },
            { colspan: { default: 12, xxs: 4 } },
          ]}
        >
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
        </Grid>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 3, xxs: 6 } },
            { colspan: { default: 12, xs: 3, xxs: 6 } },
            { colspan: { default: 12, xs: 6 } },
          ]}
        >
          <FormField label="Código de curso">
            <Input value={formValues.codigo} readOnly />
          </FormField>
          <FormField label="Estado" errorText={formErrors.estado} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.estado}
              onChange={({ detail }) =>
                handleChange("estado", detail.selectedOption)
              }
              options={estados}
            />
          </FormField>
          <FormField label="Docente" errorText={formErrors.docente_dni} stretch>
            <Autosuggest
              value={value}
              onChange={({ detail }) => setValue(detail.value)}
              onSelect={({ detail }) =>
                handleChange("docente_dni", detail.selectedOption?.value)
              }
              options={detalles.docentes}
              placeholder="Buscar docente"
              statusType={
                detalles.horarios?.length == 0 ? "loading" : "finished"
              }
            />
          </FormField>
        </Grid>
      </SpaceBetween>
    </Modal>
  );
}
