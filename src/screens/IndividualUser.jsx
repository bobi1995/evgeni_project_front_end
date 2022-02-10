import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import apiAddress from "../globals/apiAddress";
import axios from "axios";
import DialogLoader from "../components/DialogLoader";
import AlertBox from "../components/AlertBox";
import MaterialTable from "material-table";
import {
  ArrowUpward,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  GetApp,
} from "@material-ui/icons";
import history from "../components/history";
import SearchIcon from "@material-ui/icons/Search";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
  container: {
    marginTop: "3rem",
  },
  textStyle: {
    fontSize: 19,
    fontFamily: "Sansa",
  },
});
const IndividualUserScreen = (props) => {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiAddress}/user/${props.match.params.userId}`, {
        headers: {
          Authorization: "Basic " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMessage("Потребителят не може да бъде зареден");
      });
  }, []);

  return (
    <Box className={classes.container}>
      {data ? (
        <Box>
          <Box style={{ display: "flex", justifyContent: "space-around" }}>
            <Box>
              <Box style={{ marginTop: 10 }}>
                <TextField
                  label="Име"
                  className={classes.inputBox}
                  value={data.name}
                  disabled
                />
              </Box>
              <Box style={{ marginTop: 10 }}>
                <TextField
                  label="Имейл"
                  type="email"
                  className={classes.inputBox}
                  value={data.email}
                  disabled
                />
              </Box>
              <Box style={{ marginTop: 10 }}>
                <TextField
                  label="Тип"
                  className={classes.inputBox}
                  value={
                    data.isAdmin ? "Администратор" : "Обикновен потребител"
                  }
                  disabled
                />
              </Box>
              <Box style={{ marginTop: 10 }}>
                <TextField
                  label="Заплата"
                  className={classes.inputBox}
                  value={
                    data.userCost
                      ? `${data.userCost.salary} лв.`
                      : "Няма въведена"
                  }
                  disabled
                />
              </Box>
            </Box>
            <Box>
              <MaterialTable
                style={{ width: 400 }}
                title="Допълнителни разходи"
                icons={{
                  Filter: React.forwardRef((props, ref) => (
                    <SearchIcon ref={ref} />
                  )),
                  Search: React.forwardRef((props, ref) => (
                    <SearchIcon ref={ref} />
                  )),
                  ResetSearch: React.forwardRef((props, ref) => (
                    <RotateLeftIcon ref={ref} />
                  )),
                  SortArrow: ArrowUpward,
                  FirstPage: FirstPage,
                  LastPage: LastPage,
                  NextPage: ChevronRight,
                  PreviousPage: ChevronLeft,
                  Export: GetApp,
                }}
                columns={[
                  {
                    title: "Разход",
                    field: "salary",
                    render: (rowData) => {
                      return rowData.el.split(" - ")[0];
                    },
                    cellStyle: {
                      width: "70%",
                    },
                  },
                  {
                    title: "Стойност",
                    field: "power",
                    render: (rowData) => `${rowData.el.split(" - ")[1]} лв.`,
                  },
                ]}
                data={
                  data.userCost
                    ? data.userCost.others.map((el) => ({ el }))
                    : []
                }
                options={{
                  exportButton: true,
                  sorting: false,
                  search: false,
                }}
              />
            </Box>
            <Box>
              <MaterialTable
                style={{ width: 400 }}
                title="Рeзултати"
                icons={{
                  Filter: React.forwardRef((props, ref) => (
                    <SearchIcon ref={ref} />
                  )),
                  Search: React.forwardRef((props, ref) => (
                    <SearchIcon ref={ref} />
                  )),
                  ResetSearch: React.forwardRef((props, ref) => (
                    <RotateLeftIcon ref={ref} />
                  )),
                  SortArrow: ArrowUpward,
                  FirstPage: FirstPage,
                  LastPage: LastPage,
                  NextPage: ChevronRight,
                  PreviousPage: ChevronLeft,
                  Export: GetApp,
                }}
                columns={[
                  {
                    title: "Разход",
                    field: "salary",
                    render: (rowData) => {
                      return rowData.el.split(" - ")[0];
                    },
                    cellStyle: {
                      width: "70%",
                    },
                  },
                  {
                    title: "Стойност",
                    field: "power",
                    render: (rowData) => `${rowData.el.split(" - ")[1]} лв.`,
                  },
                ]}
                data={data.results ? data.results.map((el) => ({ el })) : []}
                options={{
                  exportButton: true,
                  sorting: false,
                  search: false,
                }}
              />
            </Box>
          </Box>

          <Box>
            <MaterialTable
              style={{ marginTop: 30 }}
              title="Текущи проекти"
              icons={{
                Filter: React.forwardRef((props, ref) => (
                  <SearchIcon ref={ref} />
                )),
                Search: React.forwardRef((props, ref) => (
                  <SearchIcon ref={ref} />
                )),
                ResetSearch: React.forwardRef((props, ref) => (
                  <RotateLeftIcon ref={ref} />
                )),
                SortArrow: ArrowUpward,
                FirstPage: FirstPage,
                LastPage: LastPage,
                NextPage: ChevronRight,
                PreviousPage: ChevronLeft,
                Export: GetApp,
              }}
              columns={[
                { title: "Име", field: "name" },
                {
                  title: "Мощност",
                  field: "power",
                  render: (rowData) => `${rowData.power} kw/h`,
                },
                {
                  title: "Статус",
                  field: "status",
                  render: (rowData) => (
                    <FiberManualRecordIcon
                      style={
                        rowData.status === 0
                          ? { color: "red" }
                          : rowData.status === 1
                          ? { color: "yellow" }
                          : { color: "green" }
                      }
                    />
                  ),
                },
                {
                  title: "Отвори",
                  render: (rowData) => (
                    <Button
                      onClick={() => history.push(`/project/${rowData._id}`)}
                    >
                      Отвори
                    </Button>
                  ),
                },
              ]}
              data={data.projects.map((el) => ({ ...el }))}
              options={{
                exportButton: true,
                sorting: false,
                search: false,
              }}
            />
          </Box>
        </Box>
      ) : null}
      {loading ? <DialogLoader /> : null}
      {alertMessage ? (
        <AlertBox
          success={false}
          text={alertMessage}
          display={setAlertMessage}
        />
      ) : null}
    </Box>
  );
};

export default IndividualUserScreen;
