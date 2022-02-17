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
import DialogLoader from "../components/DialogLoader";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const sendLoginRequest = () => {
    setLoading(true);

    axios({
      method: "post",
      url: `${apiAddress}/login`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("admin", res.data.admin);
          history.push("/profile");
        } else {
          setLoading(false);
          setSuccess(false);
          setAlertMessage("Грешен потребител или парола");
        }
      })
      .catch((e) => {
        setLoading(false);
        setSuccess(false);
        setAlertMessage("Грешен потребител или парола");
      });
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
          onChange={(text) => setEmail(text.target.value)}
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
      {loading ? <DialogLoader /> : null}
    </Grid>
  );
};

export default LoginForm;
