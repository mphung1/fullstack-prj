import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
  selectedId: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleConfirmDelete,
  selectedId,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Patient</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete patient with id {selectedId}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
