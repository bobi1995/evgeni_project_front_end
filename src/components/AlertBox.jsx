import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Divider from "@mui/material/Divider";

const AlertBox = ({ text, display, success }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    display("");
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="simple-dialog-title" style={{ textAlign: "center" }}>
        Система за контрол на проекти
      </DialogTitle>
      <Divider />

      <DialogContentText style={{ textAlign: "center", marginTop: "1rem" }}>
        {success === true ? (
          <CheckCircleIcon
            size={100}
            style={{ color: "green", fontSize: 70 }}
          />
        ) : (
          <CancelIcon size={100} style={{ color: "red", fontSize: 70 }} />
        )}
      </DialogContentText>
      <DialogContent>
        <DialogContentText style={{ textAlign: "center" }}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertBox;
