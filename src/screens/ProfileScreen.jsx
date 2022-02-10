import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import DialogLoader from "../components/DialogLoader";
import AlertBox from "../components/AlertBox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Typography } from "@material-ui/core";
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
import axios from "axios";
import apiAddress from "../globals/apiAddress";

const useStyles = makeStyles(() => ({
  containerStyle: {
    textAlign: "center",
    marginTop: "2%",
  },
  nameStyle: {
    color: "#3F51B5",
    fontSize: 21,
  },
  tableContainer: {
    width: "50%",
    margin: "0 auto",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiAddress}/user/${localStorage.getItem("userId")}`, {
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
        <Box className={classes.containerStyle}>
          <Typography style={{ fontSize: 27, fontFamily: "Open Sans" }}>
            {data.name}
          </Typography>
          <Typography
            style={{
              fontSize: 19,
              opacity: 0.5,
              fontStyle: "italic",
              fontFamily: "Open Sans",
            }}
          >
            {data.email}
          </Typography>

          <MaterialTable
            style={{ marginTop: 30 }}
            title="Твоите проекти"
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

export default Profile;
