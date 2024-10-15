import {
  Box,
  Button,
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
    cell: (item) => item.hora_inicio + "-" + item.hora_fin,
  },
  {
    id: "horario_desc",
    header: "Horario descripción",
    cell: (item) => item.hora_descripcion,
  },
  {
    id: "mes",
    header: "Mes",
    cell: (item) => item.mes,
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
    cell: (item) => item.estado,
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
        columnDisplay={columnDisplay}
        columnDefinitions={columnDefinitions}
        loading={loading}
        loadingText="Cargando datos"
        wrapLines
        enableKeyboardNavigation
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <Button
                disabled={collectionProps.selectedItems?.length === 0}
                variant="primary"
              >
                Ver detalle
              </Button>
            }
          >
            Listado de proyectos
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
    </BaseLayout>
  );
}
