import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material/";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import shareServer from "../../../globals/shareServer";

const useStyles = makeStyles(() => ({
  containerStyle: {
    textAlign: "center",
    marginTop: "2%",
  },
  inputBox: {
    width: 300,
  },
}));
export default function Documents(props) {
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

  const uploadOffer = (event) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.projectId);
    formData.append("rowId", props.rowData._id);
    formData.append("offer", event.target.files[0], event.target.files[0].name);

    axios({
      method: "post",
      url: `${apiAddress}/budget/offer`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteOffer = (fileName) => {
    axios({
      method: "delete",
      url: `${apiAddress}/budget/offer`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: fileName,
        projectId: props.projectId,
        rowId: props.rowData._id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const uploadInvoice = (event) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.projectId);
    formData.append("rowId", props.rowData._id);
    formData.append(
      "invoice",
      event.target.files[0],
      event.target.files[0].name
    );

    axios({
      method: "post",
      url: `${apiAddress}/budget/invoice`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteInvoice = (fileName) => {
    axios({
      method: "delete",
      url: `${apiAddress}/budget/invoice`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: fileName,
        projectId: props.projectId,
        rowId: props.rowData._id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };
  return (
    <div>
      <Button
        disabled={props.status === 2 ? true : false}
        style={{
          textAlign: "center",
          color: "black",
          "&:hover": {
            color: "#C0C0C0	",
          },
        }}
        onClick={handleClickOpen}
      >
        Отвори
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Добави нова позиция
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Box>
            <Typography>Списък оферти</Typography>
            <List>
              {props.rowData.offer.length > 0 ? (
                props.rowData.offer.map((el) => (
                  <ListItem
                    key={el}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteOffer(el)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar
                      onClick={async () =>
                        window.open(
                          `${shareServer}\\${props.projectId}\\budgetRows\\${props.rowData._id}\\offer\\${el}`
                        )
                      }
                    >
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={el} />
                  </ListItem>
                ))
              ) : (
                <Typography>Няма качени файлове</Typography>
              )}
            </List>
            <input type="file" required onChange={uploadOffer} />
          </Box>
          <Box>
            <Typography>Списък фактури</Typography>
            <List>
              {props.rowData.invoice.length > 0 ? (
                props.rowData.invoice.map((el) => (
                  <ListItem
                    key={el}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteInvoice(el)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar
                      onClick={async () =>
                        window.open(
                          `${shareServer}\\${props.projectId}\\budgetRows\\${props.rowData._id}\\invoice\\${el}`
                        )
                      }
                    >
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={el} />
                  </ListItem>
                ))
              ) : (
                <Typography>Няма качени файлове</Typography>
              )}
            </List>
            <input type="file" required onChange={uploadInvoice} />
          </Box>
        </DialogContent>
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
