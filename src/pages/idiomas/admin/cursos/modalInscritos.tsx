import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  Button,
  Header,
  Modal,
  Pagination,
  SpaceBetween,
  Table,
  TableProps,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";

interface ModalProps {
  close: () => void;
  codigo: string;
}

interface Curso {
  tipo_doc: string;
  dni: string;
  nombres: string;
  correo: string;
  celular: string;
  banco: string;
  pago: string;
  monto: string;
  fecha_pago: string;
}

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<Curso>> = [
  {
    id: "tipo_doc",
    header: "Tipo de doc.",
    cell: (item) => item.tipo_doc,
  },
  {
    id: "dni",
    header: "Dni",
    cell: (item) => item.dni,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "correo",
    header: "Correo",
    cell: (item) => item.correo,
  },
  {
    id: "celular",
    header: "Celular",
    cell: (item) => item.celular,
  },
  {
    id: "banco",
    header: "Banco",
    cell: (item) => item.banco,
  },
  {
    id: "pago",
    header: "Pago",
    cell: (item) => item.pago,
  },
  {
    id: "monto",
    header: "Monto",
    cell: (item) => item.monto,
  },
  {
    id: "fecha_pago",
    header: "Fecha de pago",
    cell: (item) => item.fecha_pago,
  },
];

const columnDisplay: ReadonlyArray<TableProps.ColumnDisplayProperties> = [
  { id: "tipo_doc", visible: true },
  { id: "dni", visible: true },
  { id: "nombres", visible: true },
  { id: "correo", visible: true },
  { id: "celular", visible: true },
  { id: "banco", visible: true },
  { id: "pago", visible: true },
  { id: "monto", visible: true },
  { id: "fecha_pago", visible: true },
];

export default function ({ close, codigo }: ModalProps) {
  //  States
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState<Curso[]>([]);

  //  Hooks
  const { items, collectionProps, paginationProps } = useCollection(
    distributions,
    {
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

  const getData: any = async () => {
    setLoading(true);
    const res = await axiosBase.get("idiomas/admin/cursos/inscritos", {
      params: {
        codigo,
      },
    });
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      size="max"
      onDismiss={close}
      header={
        <Header counter={"(" + distributions.length + ")"}>Inscritos</Header>
      }
      footer={
        <Box float="right">
          <Button variant="normal" onClick={close}>
            Cerrar
          </Button>
        </Box>
      }
    >
      <Table
        {...collectionProps}
        trackBy="dni"
        items={items}
        loading={loading}
        variant="embedded"
        loadingText="Cargando datos"
        columnDisplay={columnDisplay}
        columnDefinitions={columnDefinitions}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        pagination={<Pagination {...paginationProps} />}
      />
    </Modal>
  );
}
