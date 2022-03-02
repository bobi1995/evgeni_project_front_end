import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import history from "../../components/history";
import numeral from "numeral";

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

const SingleProject = (props) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={21}
      style={
        props.data.status === 0
          ? {
              width: 350,
              marginTop: 30,
              background:
                "linear-gradient(to bottom right, rgba(255, 0, 0,0.9)	, rgba(255, 0, 0,0.2))",
            }
          : props.data.status === 1
          ? {
              width: 350,
              marginTop: 30,
              background:
                "linear-gradient(to bottom right, rgba(245, 229, 27,0.9)	, rgba(245, 229, 27,0.2))",
            }
          : {
              width: 350,
              marginTop: 30,
              background:
                "linear-gradient(to bottom right, rgba(0,128,0,0.9)	, rgba(0,128,0,0.2))",
            }
      }
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.data.owner.name}
        </Typography>
        <Typography variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.data.location ? props.data.location : "Няма въведена локация"}
        </Typography>
        <Typography variant="body2">
          Сума по договор:{" "}
          {props.data.totalProfit
            ? `${numeral(props.data.contractSum).format("0,0")} лв.`
            : "Няма въведена сума"}
        </Typography>
        <Typography variant="body2">
          Печалба:{" "}
          {props.data.totalProfit
            ? `${numeral(props.data.totalProfit).format("0,0")} лв.`
            : "Няма въведена печалба"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => history.push(`/project/${props.data._id}`)}
          style={props.data.status === 2 ? { color: "white" } : {}}
        >
          Отвори проект
        </Button>
      </CardActions>
    </Paper>
  );
};

export default SingleProject;
