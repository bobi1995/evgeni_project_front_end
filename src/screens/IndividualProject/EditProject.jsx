import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material/";
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

const useStyles = makeStyles(() => ({
  containerStyle: {
    textAlign: "center",
    marginTop: "2%",
  },
  inputBox: {
    width: 300,
  },
}));
export default function EditBudget(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [power, setPower] = useState(props.data.power);
  const [name, setName] = useState(props.data.name);
  const [location, setLocation] = useState(props.data.location);
  const [type, setType] = useState(props.data.type);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const onChangePower = (event) => {
    setPower(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeLocation = (event) => {
    setLocation(event.target.value);
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

  const saveRow = () => {
    axios({
      method: "put",
      url: `${apiAddress}/project`,
      data: {
        name,
        location,
        power,
        type,
        projectId: props.projectId,
      },
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
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

  const deleteRow = () => {
    axios({
      method: "delete",
      url: `${apiAddress}/budget`,
      data: {
        budgetRowId: props.rowData._id,
        projectId: props.projectId,
      },
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
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

  return (
    <div>
      <Button
        style={{
          marginTop: "1%",
          textAlign: "center",
          backgroundColor: "#C0C0C0",
          color: "white",
          width: "15rem",
          marginBottom: 10,
          "&:hover": {
            color: "#C0C0C0	",
          },
        }}
        onClick={handleClickOpen}
      >
        <EditIcon /> Редактирай Проект
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Добави нова позиция
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
                label="Мощност"
                className={classes.inputBox}
                onChange={onChangePower}
                value={power}
              />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-password"
                label="Локация"
                className={classes.inputBox}
                onChange={onChangeLocation}
                value={location}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveRow} autoFocus>
            Запази
          </Button>
          <Button onClick={handleClose}>Откажи</Button>

          <Button
            onClick={deleteRow}
            style={{
              position: "absolute",
              left: 0,
              color: "white",
              backgroundColor: "red",
              marginLeft: 10,
            }}
          >
            Изтрий
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
