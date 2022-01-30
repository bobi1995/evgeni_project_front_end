import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import AlertBox from "../components/AlertBox";
import history from "../components/history";
import apiAddress from "../globals/apiAddress";
import { makeStyles } from "@mui/styles";

import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../graphql/queries";
const useStyles = makeStyles({
  paperStyle: { padding: 20, width: 280, margin: "10% auto" },

  textFieldStyle: {
    marginTop: "3%",
  },
  btnStyle: {
    margin: "8px 0",
    backgroundColor: "#1bbd7e",
    "&:hover": {
      opacity: "0.5",
      backgroundColor: "#1bbd7e",
    },
  },
});

const LoginForm = () => {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [getLogin, { loading, error, data }] = useLazyQuery(LOGIN, {
    onError: (err) => {
      console.log(err);
      setAlertMessage(
        "Could not perform login in. Please try again or contact us"
      );
    },
  });

  const sendLoginRequest = async () => {
    console.log("again");
    const res = await getLogin({
      variables: { email: user, password: password },
    });

    console.log(res);
    if (res.data.login) {
      console.log("here");
      localStorage.setItem("userId", res.data.login.userId);
      localStorage.setItem("token", res.data.login.token);
      history.push("/home");
    }
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#1bbd7e" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Добре Дошли</h2>
        </Grid>
        <TextField
          label="Потребител"
          placeholder="Въведи потребител"
          fullWidth
          onChange={(text) => setUser(text.target.value)}
        />
        <TextField
          label="Парола"
          placeholder="Въведи парола"
          type="password"
          fullWidth
          className={classes.textFieldStyle}
          onChange={(text) => setPassword(text.target.value)}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={sendLoginRequest}
          className={classes.btnStyle}
          fullWidth
        >
          Влез
        </Button>
        <Typography>
          В случай, че си забравил своята парола, може да потърсиш
          администратора.
        </Typography>
      </Paper>
      {alertMessage ? (
        <AlertBox
          success={false}
          text={alertMessage}
          display={setAlertMessage}
        />
      ) : null}
    </Grid>
  );
};

export default LoginForm;
