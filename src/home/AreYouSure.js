import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@material-ui/core";

const AreYouSure = ({
  open,
  handleClose,
  action,
  title,
  message,
  cancelText,
  confirmText,
  cancelColor,
  confirmColor,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    await action();
    setLoading(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color={cancelColor} variant="outlined">
          {cancelText}
        </Button>
        <Button
          onClick={handleAction}
          variant="contained"
          color={confirmColor}
          autoFocus
        >
          {loading ? (
            <CircularProgress size={25} color="inherit" />
          ) : (
            confirmText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AreYouSure;
