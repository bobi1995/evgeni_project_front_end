import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material/";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import apiAddress from "../../../globals/apiAddress";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import DialogLoader from "../../../components/DialogLoader";
import AlertBox from "../../../components/AlertBox";
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
export default function EditRow(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(props.rowData.position);
  const [size, setSize] = useState(props.rowData.size);
  const [quantity, setQuantity] = useState(props.rowData.quantity);
  const [singlePrice, setSinglePrice] = useState(props.rowData.singlePrice);
  const [agreedPrice, setAgreedPrice] = useState(props.rowData.agreedPrice);
  const [provider, setProvider] = useState(props.rowData.provider);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const onChangePosition = (event) => {
    setPosition(event.target.value);
  };

  const onChangeSize = (event) => {
    setSize(event.target.value);
  };

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const onChangeSinglePrice = (event) => {
    setSinglePrice(event.target.value);
  };

  const onChangeAgreedPrice = (event) => {
    setAgreedPrice(event.target.value);
  };

  const onChangeProvider = (event) => {
    setProvider(event.target.value);
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
      url: `${apiAddress}/budget`,
      data: {
        position,
        size,
        quantity,
        singlePrice,
        provider,
        agreedPrice,
        projectId: props.projectId,
        budgetRowId: props.rowData._id,
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
          textAlign: "center",
          color: "white",
          "&:hover": {
            color: "#C0C0C0	",
          },
        }}
        onClick={handleClickOpen}
      >
        <EditIcon style={{ color: "red" }} />
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
                label="Позиция"
                className={classes.inputBox}
                onChange={onChangePosition}
                value={position}
                required
              />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-email"
                label="Размер"
                className={classes.inputBox}
                onChange={onChangeSize}
                value={size}
              />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-password"
                label="Брой"
                className={classes.inputBox}
                onChange={onChangeQuantity}
                value={quantity}
                type="number"
              />
            </Box>
          </Box>

          <Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-password"
                label="Единична цена"
                className={classes.inputBox}
                onChange={onChangeSinglePrice}
                value={singlePrice}
                type="number"
              />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-password"
                label="Фактурирана цена"
                className={classes.inputBox}
                onChange={onChangeAgreedPrice}
                value={agreedPrice}
                type="number"
              />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-password"
                label="Доставчик"
                className={classes.inputBox}
                onChange={onChangeProvider}
                value={provider}
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
