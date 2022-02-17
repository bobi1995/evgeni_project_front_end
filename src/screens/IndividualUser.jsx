import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
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
import AddIcon from "@material-ui/icons/Add";
import Salary from "./IndividualUser/Salary";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import numeral from "numeral";
import moment from "moment";

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
  const [openCost, setOpenCost] = useState(false);
  const [costName, setCostName] = useState("");
  const [costValue, setCostValue] = useState("");

  const closeCost = () => {
    setOpenCost(false);
  };

  const onChangeCostName = (e) => {
    setCostName(e.target.value);
  };

  const onChangeCostValue = (e) => {
    setCostValue(e.target.value);
  };

  const saveCost = () => {
    axios({
      method: "put",
      url: `${apiAddress}/cost`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: {
        otherCost: `${costName} - ${costValue}`,
        userId: data._id,
        userCostId: data.userCost._id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteCost = (costData) => {
    axios({
      method: "delete",
      url: `${apiAddress}/cost`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: {
        userCostId: data.userCost._id,
        costData,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

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
  console.log(data);
  return (
    <Box className={classes.container}>
      {data ? (
        <Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
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

              <Box style={{ marginTop: 10, textAlign: "center" }}>
                <Button
                  style={{
                    backgroundColor: "#C0C0C0",
                    color: "white",
                    marginBottom: 10,
                    margin: "1% auto",
                    "&:hover": {
                      color: "#C0C0C0	",
                    },
                  }}
                  // onClick={handleClickOpen}
                >
                  Редактирай
                </Button>
              </Box>
              <Box style={{ marginTop: 50 }}>
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
              <Box style={{ marginTop: 10, textAlign: "center" }}>
                <Salary
                  userId={data._id}
                  costId={data.userCost ? data.userCost._id : null}
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
                    render: (rowData) =>
                      `${numeral(rowData.el.split(" - ")[1]).format(
                        "0,0"
                      )} лв.`,
                    cellStyle: {
                      width: "25%",
                    },
                  },
                  {
                    title: "Изтрий",
                    field: "delete",
                    render: (rowData) => (
                      <Button onClick={() => deleteCost(`${rowData.el}`)}>
                        <DeleteForeverIcon style={{ color: "red" }} />
                      </Button>
                    ),
                    cellStyle: {
                      textAlign: "center",
                    },
                  },
                ]}
                data={
                  data.userCost
                    ? data.userCost.others.map((el) => ({ el }))
                    : []
                }
                options={{
                  sorting: false,
                  search: false,
                }}
                actions={[
                  {
                    icon: () => <AddIcon />,
                    tooltip: "Добави разход",
                    isFreeAction: true,
                    onClick: (event) => setOpenCost(true),
                  },
                ]}
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
                    title: "Печалба",
                    field: "totalProfit",
                    render: (rowData) => {
                      console.log(rowData);
                      return `${numeral(rowData.el.totalProfit).format(
                        "0,0"
                      )} лв.`;
                    },
                  },
                  {
                    title: "Срок на покритие",
                    field: "endDate",
                    render: (rowData) =>
                      moment(new Date(rowData.el.endDate)).format(
                        "DD-MMM-yyyy"
                      ),
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
      <Dialog
        open={openCost}
        onClose={closeCost}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Добави разход
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-name"
                label="Разход"
                className={classes.inputBox}
                onChange={onChangeCostName}
                value={costName}
                required
              />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-name"
                label="Стойност"
                className={classes.inputBox}
                onChange={onChangeCostValue}
                value={costValue}
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCost}>Откажи</Button>
          <Button onClick={saveCost} autoFocus>
            Запази
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IndividualUserScreen;
