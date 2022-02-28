import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import numeral from "numeral";
import { makeStyles } from "@mui/styles";
import EditRow from "./EditRow";
import Documents from "./Documents";

const useStyles = makeStyles({
  tableBox: {
    display: "flex",
    justifyContent: "space-around",
  },

  rowStyle: {
    lineHeight: 1.1,
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});

const BudgetTable = ({ data, projectId, status }) => {
  const classes = useStyles();
  //const [pageWa, setPageWa] = React.useState(0);
  // const [rowsPerPageWa, setRowsPerPageWa] = React.useState(10);
  let totalSingle = 0;
  let totalAgreed = 0;
  let totalDifference = 0;

  useEffect(() => {
    data.map((el) => {
      totalSingle = el.singlePrice * el.quantity + totalSingle;
      totalAgreed = el.agreedPrice * el.quantity + totalAgreed;
      totalDifference = el.difference + totalDifference;
    });

    data.push({
      total: true,
      singlePrice: totalSingle,
      agreedPrice: totalAgreed,
      difference: totalDifference,
      position: "ОБЩО",
    });
  }, []);

  return (
    <div style={{ marginTop: 30, width: "100%" }}>
      <Paper>
        <TableContainer>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow style={{ backgroundColor: "#FF9999" }}>
                <TableCell
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "#FF6666",
                  }}
                >
                  Позиция
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Размер
                </TableCell>

                <TableCell
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Брой
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Ед.цена
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Договорена цена
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Разлика
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Цена/мощност
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Доставчик
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Документи
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Редакция
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                // .slice(
                //   pageWa * rowsPerPageWa,
                //   pageWa * rowsPerPageWa + rowsPerPageWa
                // )
                .map((row, ind) => (
                  <TableRow
                    key={ind}
                    style={row.total ? { backgroundColor: "#FF9999" } : {}}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        backgroundColor: row.total ? "#FF9999" : "#FF6666",
                        color: "white",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      <p
                        className={row.total}
                        style={row.total ? { fontWeight: "bold" } : {}}
                      >
                        {row.position}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className={classes.rowStyle}>{row.size}</p>
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell
                      style={
                        row.total ? { fontWeight: "bold", color: "white" } : {}
                      }
                    >
                      {numeral(row.singlePrice).format("0,0.00")} лв.
                    </TableCell>
                    <TableCell
                      style={
                        row.total ? { fontWeight: "bold", color: "white" } : {}
                      }
                    >
                      {numeral(row.agreedPrice).format("0,0.00")} лв.
                    </TableCell>
                    <TableCell
                      style={
                        row.difference > 0
                          ? { color: "red", fontWeight: "bold" }
                          : { color: "green", fontWeight: "bold" }
                      }
                    >
                      {numeral(row.difference).format("0,0.00")} лв.
                    </TableCell>
                    <TableCell>
                      {row.total ? null : numeral(row.priceWp).format("0,0.00")}
                    </TableCell>
                    <TableCell>{row.provider}</TableCell>
                    <TableCell>
                      {row.total ? null : (
                        <Documents rowData={row} projectId={projectId} />
                      )}
                    </TableCell>
                    <TableCell>
                      {row.total ? null : (
                        <EditRow
                          rowData={row}
                          projectId={projectId}
                          status={status}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Paginations
          counter={data.length}
          page={pageWa}
          setPage={setPageWa}
          rowsPerPage={rowsPerPageWa}
          setRowsPerPage={setRowsPerPageWa}
          rowsPerPageOptions={[10, 20, 50]}
        /> */}
      </Paper>
    </div>
  );
};

export default BudgetTable;
