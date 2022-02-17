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
import IndividualUser from "./UsersScreen/IndividualUser";

const useStyles = makeStyles(() => ({
  containerStyle: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
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

const UsersScreen = (props) => {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiAddress}/user`, {
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
        <Box className={classes.containerStyle}>
          {data.length > 0 ? (
            data.map((el) => <IndividualUser data={el} />)
          ) : (
            <Typography>Няма активни потребители</Typography>
          )}
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

export default UsersScreen;
