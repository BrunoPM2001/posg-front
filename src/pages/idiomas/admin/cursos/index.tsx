import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  Pagination,
  PropertyFilter,
  PropertyFilterProps,
  SpaceBetween,
  Table,
  TableProps,
} from "@cloudscape-design/components";
import BaseLayout from "../components/baseLayout";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import ModalAgregar from "./modalAgregar";
import ModalEditar from "./modalEditar";
import ModalEliminar from "./modalEliminar";
import ModalInscritos from "./modalInscritos";

interface Curso {
  codigo: string;
  idioma: string;
  programa: string;
  nivel: string;
  hora_inicio: string;
  hora_fin: string;
  hora_descripcion: string;
  mes: string;
  modalidad: string;
  seccion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  inscritos: number;
}

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS: ReadonlyArray<PropertyFilterProps.FilteringProperty> = [
  {
    key: "codigo",
    propertyLabel: "Código",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    key: "idioma",
    propertyLabel: "Idioma",
    groupValuesLabel: "Idiomas",
    operators: stringOperators,
  },
  {
    key: "programa",
    propertyLabel: "Programa",
    groupValuesLabel: "Programas",
    operators: stringOperators,
  },
  {
    key: "nivel",
    propertyLabel: "Nivel",
    groupValuesLabel: "Niveles",
    operators: stringOperators,
  },
  {
    key: "horario",
    propertyLabel: "Horario",
    groupValuesLabel: "Horarios",
    operators: stringOperators,
  },
  {
    key: "horario",
    propertyLabel: "Horario",
    groupValuesLabel: "Horarios",
    operators: stringOperators,
  },
  {
    key: "horario_desc",
    propertyLabel: "Descripción de horario",
    groupValuesLabel: "Descripciones",
    operators: stringOperators,
  },
  {
    key: "modalidad",
    propertyLabel: "Modalidad",
    groupValuesLabel: "Modalidades",
    operators: stringOperators,
  },
  {
    key: "seccion",
    propertyLabel: "Sección",
    groupValuesLabel: "Secciones",
    operators: stringOperators,
  },
];

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<Curso>> = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
  },
  {
    id: "idioma",
    header: "Idioma",
    cell: (item) => item.idioma,
  },
  {
    id: "programa",
    header: "Programa",
    cell: (item) => item.programa,
  },
  {
    id: "nivel",
    header: "Nivel",
    cell: (item) => item.nivel,
  },
  {
    id: "horario",
    header: "Horario",
    cell: (item) => item.hora_inicio + " - " + item.hora_fin,
  },
  {
    id: "horario_desc",
    header: "Horario descripción",
    cell: (item) => item.hora_descripcion,
  },
  {
    id: "mes",
    header: "Mes",
    cell: (item) => item.mes.slice(0, 7),
  },
  {
    id: "modalidad",
    header: "Modalidad",
    cell: (item) => item.modalidad,
  },
  {
    id: "seccion",
    header: "Sección",
    cell: (item) => item.seccion,
  },
  {
    id: "fecha_inicio",
    header: "Fecha inicio",
    cell: (item) => item.fecha_inicio,
  },
  {
    id: "fecha_fin",
    header: "Fecha fin",
    cell: (item) => item.fecha_fin,
  },
  {
    id: "inscritos",
    header: "Inscritos",
    cell: (item) => item.inscritos,
  },
  {
    id: "estado",
    header: "Estado",
    minWidth: 130,
    cell: (item) => (
      <Badge
        color={
          item.estado === "Inhabilitado"
            ? "grey"
            : item.estado === "En matrícula"
            ? "blue"
            : item.estado === "En curso"
            ? "green"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
  },
];

const columnDisplay: ReadonlyArray<TableProps.ColumnDisplayProperties> = [
  { id: "codigo", visible: true },
  { id: "idioma", visible: true },
  { id: "programa", visible: true },
  { id: "nivel", visible: true },
  { id: "horario", visible: true },
  { id: "horario_desc", visible: true },
  { id: "mes", visible: true },
  { id: "modalidad", visible: true },
  { id: "seccion", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "inscritos", visible: true },
  { id: "estado", visible: true },
];

export function Component() {
  //  States
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState<Curso[]>([]);
  const [modal, setModal] = useState("");

  //  Hooks
  const {
    items,
    actions,
    collectionProps,
    paginationProps,
    filteredItemsCount,
    propertyFilterProps,
  } = useCollection(distributions, {
    propertyFiltering: {
      filteringProperties: FILTER_PROPS,
      empty: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      ),
      noMatch: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay coincidencias</b>
          </SpaceBetween>
        </Box>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: {},
    selection: {},
  });

  const getData: any = async () => {
    setLoading(true);
    const res = await axiosBase.get("idiomas/admin/cursos/cursos");
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      header="Gestión de cursos"
      contentType="table"
      breadcrumbs={[
        {
          text: "Administrador",
          href: "#",
        },
        {
          text: "Gestión de cursos",
          href: "#",
        },
      ]}
    >
      <Table
        {...collectionProps}
        trackBy="codigo"
        items={items}
        loading={loading}
        loadingText="Cargando datos"
        columnDisplay={columnDisplay}
        columnDefinitions={columnDefinitions}
        selectionType="single"
        enableKeyboardNavigation
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <ButtonDropdown
                  disabled={collectionProps.selectedItems?.length === 0}
                  items={[
                    {
                      id: "action1",
                      text: "Editar",
                    },
                    {
                      id: "action2",
                      text: "Eliminar",
                    },
                    {
                      id: "action3",
                      text: "Ver inscritos",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    setModal(
                      detail.id === "action1"
                        ? "editar"
                        : detail.id === "action2"
                        ? "eliminar"
                        : detail.id === "action3"
                        ? "inscritos"
                        : ""
                    );
                  }}
                >
                  Acciones
                </ButtonDropdown>
                <Button variant="primary" onClick={() => setModal("agregar")}>
                  Agregar
                </Button>
              </SpaceBetween>
            }
          >
            Listado de cursos
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar curso"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
            virtualScroll
          />
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        pagination={<Pagination {...paginationProps} />}
      />
      {collectionProps.selectedItems &&
        (modal === "agregar" ? (
          <ModalAgregar close={() => setModal("")} reload={getData} />
        ) : modal === "editar" ? (
          <ModalEditar
            close={() => setModal("")}
            codigo={collectionProps.selectedItems[0].codigo}
            reload={getData}
          />
        ) : modal === "inscritos" ? (
          <ModalInscritos
            close={() => setModal("")}
            codigo={collectionProps.selectedItems[0].codigo}
          />
        ) : (
          modal === "eliminar" && (
            <ModalEliminar
              close={() => setModal("")}
              codigo={collectionProps.selectedItems[0].codigo}
              reload={getData}
            />
          )
        ))}
    </BaseLayout>
  );
}
