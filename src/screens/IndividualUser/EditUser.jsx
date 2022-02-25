import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material/";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import apiAddress from "../../globals/apiAddress";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import DialogLoader from "../../components/DialogLoader";
import AlertBox from "../../components/AlertBox";
import EditIcon from "@material-ui/icons/Edit";
import history from "../../components/history";
const useStyles = makeStyles(() => ({
  containerStyle: {
    textAlign: "center",
    marginTop: "2%",
  },
  inputBox: {
    width: 300,
  },
}));
export default function EditUser(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.data.name);
  const [email, setEmail] = useState(props.data.email);
  const [type, setType] = useState(props.data.isAdmin);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveUser = () => {
    axios({
      method: "post",
      url: `${apiAddress}/user`,
      data: {
        name,
        email,
        type,
        userId: props.userId,
      },
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("admin", type);

          if (type === true) {
            window.location.reload();
          } else history.push("/profile");
        } else setAlertMessage(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  return (
    <div>
      <Button
        style={{
          marginTop: "1%",
          textAlign: "center",
          backgroundColor: "#C0C0C0",
          color: "white",
          width: "12rem",
          marginBottom: 10,

          "&:hover": {
            color: "#C0C0C0	",
          },
        }}
        onClick={handleClickOpen}
      >
        <EditIcon /> Редактирай
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Редактирай Потребител
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Box>
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
                className={classes.inputBox}
                onChange={onChangeEmail}
                value={email}
              />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <FormControl className={classes.inputBox}>
                <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Админ"
                  onChange={onChangeType}
                >
                  <MenuItem value={true}>Администратор</MenuItem>
                  <MenuItem value={false}>Обикновен</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Откажи</Button>

          <Button
            onClick={saveUser}
            style={{
              position: "absolute",
              left: 0,
              color: "white",
              backgroundColor: "green",
              marginLeft: 10,
            }}
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>
      {loading ? <DialogLoader /> : null}
      {alertMessage ? (
        <AlertBox
          success={false}
          text={alertMessage}
          display={setAlertMessage}
        />
      ) : null}
    </div>
  );
}
