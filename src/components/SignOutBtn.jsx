import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

export default function SingOutBtn(props) {
  const [open, setOpen] = React.useState(props.openSignOut);

  const confirmSignOut = () => {
    localStorage.clear();
    setOpen(false);
  };

  const handleClose = () => {
    props.setOpenSignOut(false);
    props.setSelected("");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Сигурен ли си?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Сигурен ли си, че искаш да напуснеш системата? Ако имаш незапазени
            промени те ще бъдат загубени.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Не, остани</Button>
          <Button autoFocus onClick={confirmSignOut}>
            <a href="http://localhost:3000" rel="noreferrer">
              Да, напусни
            </a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
