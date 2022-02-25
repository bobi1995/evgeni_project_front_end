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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
export default function DeleteProject(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProject = () => {
    setLoading(true);
    axios({
      method: "delete",
      url: `${apiAddress}/project`,
      data: {
        projectId: props.projectId,
      },
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          history.push("/profile");
        } else setAlertMessage(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Button
        style={{
          marginTop: "1%",
          textAlign: "center",
          backgroundColor: "#C0C0C0",
          color: "white",
          width: "15rem",
          backgroundColor: "rgba(255, 0, 0,1)",
          marginBottom: 10,
          "&:hover": {
            color: "#C0C0C0",
            backgroundColor: "rgba(255, 0, 0,0.5)",
          },
        }}
        onClick={handleClickOpen}
      >
        <DeleteForeverIcon /> Изтрий проект
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Изтрий проект
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          Изтриването на проект автоматично значи, че той ще бъде премахнат
          завинаги от базата данни, а със него и всички прикачени файлове,
          редовете от бюджета, както и постигнатия резултат от потребителя (ако
          той е затворен).
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteProject} autoFocus>
            Изтрий
          </Button>
          <Button onClick={handleClose}>Откажи</Button>
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
