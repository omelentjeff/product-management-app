import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteProduct } from "../apiService";
import { useAuth } from "../hooks/AuthProvider";

/**
 * DeleteDialog Component - A dialog for confirming the deletion of a product.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.product - The product object to be deleted, containing at least an `id` and a `name`.
 * @param {function} props.onDelete - Callback function to be called when a product is successfully deleted.
 *
 * @returns {JSX.Element} The rendered delete confirmation dialog component.
 */
export default function DeleteDialog({ product, onDelete }) {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  /**
   * Opens the delete confirmation dialog.
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Closes the delete confirmation dialog.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the deletion of the product. Calls the deleteProduct API and triggers the onDelete callback.
   *
   * @returns {Promise<void>} A promise that resolves when the delete operation is complete.
   */
  const handleDelete = async () => {
    try {
      await deleteProduct(token, product.id);
      onDelete(product.id);
      handleClose();
    } catch (error) {
      console.error(`Error deleting product:`, error);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete {product.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
