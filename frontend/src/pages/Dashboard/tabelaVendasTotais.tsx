import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// third-party
import { NumericFormat } from "react-number-format";

// project import
import Dot from "components/@extended/Dot";

function createData(
  compraId: string,
  evento: string,
  qt_tickets: string,
  data: string,
  status: string,
  valor_total: string
) {
  return { compraId, evento, qt_tickets, data, status, valor_total };
}

const rows = [
  createData(
    "10f1aaac-8942-4c02-a604-560b7dbd4e56",
    "Javascript Mental",
    "40",
    "14-01-2024",
    "Pendente",
    "142"
  ),
  createData(
    "a8bc62f2-358f-4b11-89b5-df1c9145f9d3",
    "Suá Sem Dó",
    "5",
    "14-01-2024",
    "Pago",
    "25"
  ),
  createData(
    "10f1aaac-8942-4c02-a604-560b7dbd4e56",
    "Amazon Games",
    "120",
    "14-01-2024",
    "Pendente",
    "450"
  ),
  createData(
    "a8bc62f2-358f-4b11-89b5-df1c9145f9d3",
    "Sua Sem Dó",
    "50",
    "14-01-2024",
    "Cancelado",
    "150"
  ),
  createData(
    "10f1aaac-8942-4c02-a604-560b7dbd4e56",
    "Amazon Games",
    "36",
    "14-01-2024",
    "Pago",
    "94"
  ),
  createData(
    "b7bc1212-7a3d-4357-824e-9e1bbbf506d4",
    "Amazon Games",
    "10",
    "14-01-2024",
    "Cancelado",
    "100"
  ),
  createData(
    "a8bc62f2-358f-4b11-89b5-df1c9145f9d3",
    "Javascript Mental",
    "23",
    "13-01-2024",
    "Estornado",
    "45"
  ),
  createData(
    "a8bc62f2-358f-4b11-89b5-df1c9145f9d3",
    "Chiado da Chinela",
    "25",
    "12-01-2024",
    "Pago",
    "50"
  ),
  createData(
    "b7bc1212-7a3d-4357-824e-9e1bbbf506d4",
    "Amazon Games",
    "185",
    "12-01-2024",
    "Pago",
    "967"
  ),
  createData(
    "b7bc1212-7a3d-4357-824e-9e1bbbf506d4",
    "Javascript Mental",
    "100",
    "12-01-2024",
    "Cancelado",
    "670"
  ),
];

function descendingComparator(a: string[], b: string[], orderBy: number) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: string | number,
  orderBy: number
): (a: string[], b: string[]) => number {
  return order === "desc"
    ? (a: string[], b: string[]) => descendingComparator(a, b, orderBy)
    : (a: string[], b: string[]) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: string[],
  comparator: (a: string[], b: string[]) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "compraId",
    align: "left",
    disablePadding: false,
    label: "ID da Compra",
  },
  {
    id: "evento",
    align: "left",
    disablePadding: true,
    label: "Evento",
  },
  {
    id: "qt_tickets",
    align: "right",
    disablePadding: false,
    label: "Quantidade de Tickets",
  },
  {
    id: "data",
    align: "left",
    disablePadding: false,
    label: "Data de Compra",
  },
  {
    id: "status",
    align: "right",
    disablePadding: false,
    label: "Status da Compra",
  },
  {
    id: "valor_total",
    align: "right",
    disablePadding: false,
    label: "Valor Total",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

function OrderStatus(status: number) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = "warning";
      title = "Pendente";
      break;
    case 1:
      color = "success";
      title = "Pago";
      break;
    case 2:
      color = "error";
      title = "Cancelado";
      break;
    default:
      color = "primary";
      title = "Estornado";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState("asc");
  const [orderBy] = useState("compraId");
  const [selected] = useState([]);

  const isSelected = (compraId: string) => selected.indexOf(compraId) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-of-type": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-of-type": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row.compraId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.compraId}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      <Link color="secondary" component={RouterLink} to="">
                        {row.compraId}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="left">
                      <OrderStatus status={row.carbs} />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.protein}
                        displayType="text"
                        thousandSeparator
                        prefix="$"
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
