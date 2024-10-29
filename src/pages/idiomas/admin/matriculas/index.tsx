import {
  Badge,
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
import ModalSolicitud from "./modalSolicitud";

interface Matricula {
  id: number;
  nombres: string;
  idioma: string;
  programa: string;
  nivel: string;
  horario: string;
  estado: string;
  modalidad: string;
}

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS: ReadonlyArray<PropertyFilterProps.FilteringProperty> = [
  {
    key: "nombres",
    propertyLabel: "Nombres",
    groupValuesLabel: "Nombres",
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
];

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<Matricula>> =
  [
    {
      id: "nombres",
      header: "Nombres",
      cell: (item) => item.nombres,
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
      cell: (item) => item.horario,
    },
    {
      id: "estado",
      header: "Estado",
      minWidth: 130,
      cell: (item) => (
        <Badge
          color={
            item.estado == "Aprobada"
              ? "green"
              : item.estado == "Rechazada"
              ? "red"
              : "blue"
          }
        >
          {item.estado}
        </Badge>
      ),
    },
  ];

const columnDisplay: ReadonlyArray<TableProps.ColumnDisplayProperties> = [
  { id: "nombres", visible: true },
  { id: "idioma", visible: true },
  { id: "programa", visible: true },
  { id: "nivel", visible: true },
  { id: "horario", visible: true },
  { id: "estado", visible: true },
];

export function Component() {
  //  States
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState<Matricula[]>([]);
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
    const res = await axiosBase.get("idiomas/admin/matriculas/matriculas");
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
      header="Gestión de matrículas"
      contentType="table"
      breadcrumbs={[
        {
          text: "Administrador",
          href: "#",
        },
        {
          text: "Gestión de matrículas",
          href: "#",
        },
      ]}
    >
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        loading={loading}
        loadingText="Cargando datos"
        columnDisplay={columnDisplay}
        columnDefinitions={columnDefinitions}
        selectionType="single"
        enableKeyboardNavigation
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        wrapLines
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <Button
                disabled={collectionProps.selectedItems?.length === 0}
                variant="primary"
                onClick={() => setModal("solicitud")}
              >
                Ver solicitud
              </Button>
            }
          >
            Listado de matrículas
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar solicitud de matrícula"
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
      {collectionProps.selectedItems && modal === "solicitud" && (
        <ModalSolicitud
          close={() => setModal("")}
          matricula_id={collectionProps.selectedItems[0].id}
          reload={getData}
        />
      )}
    </BaseLayout>
  );
}
