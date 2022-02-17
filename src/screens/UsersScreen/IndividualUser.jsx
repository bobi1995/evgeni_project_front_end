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

const IndividualUser = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={21} style={{ width: 350, marginTop: 30 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Потребител
        </Typography>
        <Typography variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.data.isAdmin ? "Администратор" : "Обикновен потребител"}
        </Typography>
        <Typography variant="body2">{props.data.email}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => history.push(`/user/${props.data._id}`)}
        >
          Отвори профил
        </Button>
      </CardActions>
    </Paper>
  );
};

export default IndividualUser;
