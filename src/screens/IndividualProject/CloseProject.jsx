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
import DoneAllIcon from "@material-ui/icons/DoneAll";

const useStyles = makeStyles(() => ({
  containerStyle: {
    textAlign: "center",
    marginTop: "2%",
  },
  inputBox: {
    width: 300,
  },
}));
export default function CloseProject(props) {
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

  const closeProject = () => {
    if (props.data.status === 0) {
      setAlertMessage(
        "Няма качен договор. Проектът не може да бъде затворен без договор"
      );
    } else if (!props.data.contractSum) {
      setAlertMessage(
        "Няма въведена сума по контракта. Проектът не може да бъде затворен без въведена сума."
      );
    } else if (!props.data.totalProfit) {
      setAlertMessage(
        "Няма въведена печалба.Проектът не може да бъде затворен без въведена печалба."
      );
    } else {
      axios({
        method: "post",
        url: `${apiAddress}/project/close`,
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
          if (res.status === 200) {
            window.location.reload();
          } else setAlertMessage(res.data);
        })
        .catch((e) => {
          setLoading(false);
          setAlertMessage(e);
        });
    }
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Button
        disabled={props.data.status === 2 ? true : false}
        style={{
          marginTop: "1%",
          textAlign: "center",
          backgroundColor: "#C0C0C0",
          color: "white",
          width: "15rem",
          backgroundColor: "rgba(104, 195, 163,1)",
          marginBottom: 10,
          "&:hover": {
            color: "#C0C0C0",
            backgroundColor: "rgba(104, 195, 163,0.5)",
          },
        }}
        onClick={handleClickOpen}
      >
        <DoneAllIcon /> Завърши проект
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Завърши проект
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          Завършването на проект автоматично значи, че той не може повече да
          бъде редактиран и отварян отново. Резултата от затворения проект влиза
          в досието на случителя като постигнати ползи за компанията.
        </DialogContent>
        <DialogActions>
          <Button onClick={closeProject} autoFocus>
            Завърши
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
