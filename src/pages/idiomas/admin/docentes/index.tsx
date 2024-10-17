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

interface Docente {
  dni: string;
  paterno: string;
  materno: string;
  nombres: string;
  celular: string;
  correo: string;
  estado: string;
}

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS: ReadonlyArray<PropertyFilterProps.FilteringProperty> = [
  {
    key: "dni",
    propertyLabel: "Dni",
    groupValuesLabel: "N° de documentos",
    operators: stringOperators,
  },
  {
    key: "paterno",
    propertyLabel: "Ap. Paterno",
    groupValuesLabel: "Ap. Paternos",
    operators: stringOperators,
  },
  {
    key: "materno",
    propertyLabel: "Ap. Materno",
    groupValuesLabel: "Ap. Maternos",
    operators: stringOperators,
  },
  {
    key: "nombres",
    propertyLabel: "Nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    key: "celular",
    propertyLabel: "Celular",
    groupValuesLabel: "Celulares",
    operators: stringOperators,
  },
  {
    key: "correo",
    propertyLabel: "Correo",
    groupValuesLabel: "Correos",
    operators: stringOperators,
  },
  {
    key: "estado",
    propertyLabel: "Estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
];

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<Docente>> = [
  {
    id: "dni",
    header: "Dni",
    cell: (item) => item.dni,
  },
  {
    id: "paterno",
    header: "Ap. paterno",
    cell: (item) => item.paterno,
  },
  {
    id: "materno",
    header: "Materno",
    cell: (item) => item.materno,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "celular",
    header: "Celular",
    cell: (item) => item.celular,
  },
  {
    id: "correo",
    header: "Correo",
    cell: (item) => item.correo,
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge color={item.estado == "Inactivo" ? "red" : "blue"}>
        {item.estado}
      </Badge>
    ),
  },
];

const columnDisplay: ReadonlyArray<TableProps.ColumnDisplayProperties> = [
  { id: "dni", visible: true },
  { id: "paterno", visible: true },
  { id: "materno", visible: true },
  { id: "nombres", visible: true },
  { id: "celular", visible: true },
  { id: "correo", visible: true },
  { id: "estado", visible: true },
];

export function Component() {
  //  States
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState<Docente[]>([]);
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
    const res = await axiosBase.get("idiomas/admin/docentes/docentes");
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
      header="Gestión de docentes"
      contentType="table"
      breadcrumbs={[
        {
          text: "Administrador",
          href: "#",
        },
        {
          text: "Gestión de docentes",
          href: "#",
        },
      ]}
    >
      <Table
        {...collectionProps}
        trackBy="dni"
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
                  ]}
                  onItemClick={({ detail }) => {
                    setModal(detail.id === "action1" ? "editar" : "eliminar");
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
            Listado de docentes
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar docente"
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
            dni={collectionProps.selectedItems[0].dni}
            reload={getData}
          />
        ) : (
          modal === "eliminar" && (
            <ModalEliminar
              close={() => setModal("")}
              dni={collectionProps.selectedItems[0].dni}
              reload={getData}
            />
          )
        ))}
    </BaseLayout>
  );
}
