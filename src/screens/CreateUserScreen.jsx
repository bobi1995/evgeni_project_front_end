import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DialogLoader from "../components/DialogLoader";
import AlertBox from "../components/AlertBox";
import history from "../components/history";
import CreateBtn from "../components/CreateBtn";
import apiAddress from "../globals/apiAddress";
import axios from "axios";

const useStyles = makeStyles(() => ({
  inputBox: {
    width: 300,
  },
  btnStyle: {
    backgroundColor: "red",
    width: 100,
  },
}));

const CreateUserScreen = (props) => {
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const addUser = () => {
    if (password !== confirmPassword) {
      return setAlertMessage("Паролите не съвпадат");
    }

    axios({
      method: "post",
      url: `${apiAddress}/user/add`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: {
        name,
        email,
        password,
        isAdmin,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          history.push(`/user/${res.data}`);
        }
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Box style={{ marginTop: "2%", textAlign: "center" }}>
      <Box style={{ marginTop: 10 }}>
        <TextField
          id="outlined-name"
          label="Име"
          className={classes.inputBox}
          onChange={onChangeName}
          value={name}
        />
      </Box>
      <Box style={{ marginTop: 10 }}>
        <TextField
          id="outlined-email"
          label="Имейл"
          type="email"
          className={classes.inputBox}
          onChange={onChangeEmail}
          value={email}
        />
      </Box>
      <Box style={{ marginTop: 10 }}>
        <TextField
          id="outlined-password"
          label="Парола"
          type="password"
          className={classes.inputBox}
          onChange={onChangePassword}
          value={password}
        />
      </Box>
      <Box style={{ marginTop: 10 }}>
        <TextField
          id="outlined-confirm-password"
          label="Потвърди парола"
          type="password"
          className={classes.inputBox}
          onChange={onChangeConfirmPassword}
          value={confirmPassword}
        />
      </Box>

      <Box style={{ marginTop: 10 }}>
        <FormControl className={classes.inputBox}>
          <InputLabel id="demo-simple-select-label">Тип</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isAdmin}
            label="Админ"
            onChange={handleAdminChange}
          >
            <MenuItem value={true}>Администратор</MenuItem>
            <MenuItem value={false}>Обикновен</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box style={{ marginTop: 10 }}>
        <CreateBtn clicked={() => addUser()} />
      </Box>
      {loading ? <DialogLoader /> : null}
      {alertMessage ? (
        <AlertBox
          text={alertMessage}
          display={setAlertMessage}
          success={false}
        />
      ) : null}
    </Box>
  );
};

export default CreateUserScreen;
