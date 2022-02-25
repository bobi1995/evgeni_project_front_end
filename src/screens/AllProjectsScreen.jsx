import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DialogLoader from "../components/DialogLoader";
import AlertBox from "../components/AlertBox";
import { Typography } from "@material-ui/core";
import SingleProject from "./AllProjects/SingleProject";
import history from "../components/history";
import axios from "axios";
import apiAddress from "../globals/apiAddress";

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

const AllProjectsScreen = (props) => {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiAddress}/project`, {
        headers: {
          Authorization: "Basic " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        res.data.sort((a, b) =>
          a.status > b.status ? 1 : b.status > a.status ? -1 : 0
        );
        setData(res.data);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMessage("Проектите не могат да бъдат заредени");
      });
  }, []);

  console.log(data);
  return (
    <Box className={classes.container}>
      {data ? (
        <Box className={classes.containerStyle}>
          {data.length > 0 ? (
            data.map((el) => <SingleProject data={el} />)
          ) : (
            <Typography>Няма налични проекти</Typography>
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

export default AllProjectsScreen;
