import { useState, MouseEvent, ChangeEvent, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Chip, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Money } from "../../utils/currency";
import { TabelaGeral } from "../../services/dashboard.service";
interface Table {
  title: string;
  rows: TabelaGeral[];
}
interface Data {
  titulo: string;
  created_at: string;
  formaPagamento: string;
  descricao: string;
  status: string;
  valor: string;
  quantidade: number;
}

function chipColor(status: string) {
  if (status === "Pago") {
    return "success";
  } else if (status === "Aguardando Pagamento") {
    return "warning";
  } else {
    return "error";
  }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  align: "center" | "right" | "left";
}

const headCells: readonly HeadCell[] = [
  {
    id: "titulo",
    align: "left",
    disablePadding: true,
    label: "Evento",
  },
  {
    id: "created_at",
    align: "center",
    disablePadding: false,
    label: "Data/Hora",
  },
  {
    id: "formaPagamento",
    align: "center",
    disablePadding: false,
    label: "Tipo de Pagamento",
  },
  {
    id: "descricao",
    align: "center",
    disablePadding: false,
    label: "Ticket",
  },
  {
    id: "quantidade",
    align: "center",
    disablePadding: false,
    label: "Quantidade",
  },
  {
    id: "status",
    align: "center",
    disablePadding: false,
    label: "Status",
  },
  {
    id: "valor",
    align: "center",
    disablePadding: false,
    label: "Valor Total",
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell>{"#"}</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable(props: Table) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("created_at");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [title, setTitle] = useState("");

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(props.rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, props.rows]
  );

  function convertData(data: string) {
    const newData = new Date(data).toLocaleString();
    return newData;
  }

  useEffect(() => {
    if (props.title !== "") {
      setTitle(`Últimas Movimentações - ${props.title}`);
    } else {
      setTitle(`Últimas Movimentações`);
    }
  }, [props.title]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {row.titulo}
                    </TableCell>
                    <TableCell align="center">
                      {convertData(row.created_at)}
                    </TableCell>
                    <TableCell align="center">{row.formaPagamento}</TableCell>
                    <TableCell align="center">{row.descricao}</TableCell>
                    <TableCell align="center">{row.quantidade}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        color={chipColor(row.status)}
                        sx={{
                          height: 24,
                          fontSize: "0.75rem",
                          textTransform: "capitalize",
                          "& .MuiChip-label": { fontWeight: 500 },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {Money.format(parseInt(row.valor))}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Reduzir espaço da tabela?"
      />
    </Box>
  );
}
