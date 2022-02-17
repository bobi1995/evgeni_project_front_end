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

const useStyles = makeStyles(() => ({
  containerStyle: {
    textAlign: "center",
    marginTop: "2%",
  },
  inputBox: {
    width: 300,
  },
}));
export default function Salary(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [salary, setSalary] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const onChangeSalary = (event) => {
    setSalary(event.target.value);
  };

  const saveRow = () => {
    axios({
      method: props.costId ? "put" : "post",
      url: `${apiAddress}/cost`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: {
        salary,
        userId: props.userId,
        userCostId: props.costId,
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <AddCircleIcon /> Промени
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Промени заплата
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Box>
            <Box style={{ marginTop: 10 }}>
              <TextField
                id="outlined-name"
                label="Заплата"
                className={classes.inputBox}
                onChange={onChangeSalary}
                value={salary}
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Откажи</Button>
          <Button onClick={saveRow} autoFocus>
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
