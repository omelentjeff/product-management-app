import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Box,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import {
  fetchSingleData,
  updateProductDetails,
  uploadProductImage,
} from "../apiService";
import { useAuth } from "../hooks/AuthProvider";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const NUTRITIONAL_FACTS = [
  { label: "Calories", key: "calories", unit: "kcal" },
  { label: "Kilojoules", key: "kilojoules", unit: "kJ" },
  { label: "Fat", key: "fat", unit: "g" },
  { label: "Carbohydrates", key: "carbohydrates", unit: "g" },
  { label: "Sugars", key: "sugars", unit: "g" },
  { label: "Polyols", key: "polyols", unit: "g" },
  { label: "Fibers", key: "fibers", unit: "g" },
  { label: "Protein", key: "protein", unit: "g" },
  { label: "Sodium", key: "sodium", unit: "g" },
  { label: "Vitamin C", key: "vitaminC", unit: "mg" },
  { label: "Calcium", key: "calcium", unit: "mg" },
];

export default function EditDialog({ product, text, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const { token } = useAuth();

  const handleClickOpen = async () => {
    setOpen(true);
    setIsLoading(true);

    try {
      const details = await fetchSingleData(token, product.id);
      console.log("Product details fetched:", details);
      setProductDetails(details);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setProductDetails(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input belongs to nutritional facts
    if (NUTRITIONAL_FACTS.some((fact) => fact.key === name)) {
      setProductDetails((prev) => ({
        ...prev,
        nutritionalFact: {
          ...prev.nutritionalFact,
          [name]: value, // Update the specific nutritional fact
        },
      }));
    } else {
      setProductDetails((prev) => ({
        ...prev,
        [name]: value, // Update other product details
      }));
    }

    // Clear the error for the modified field
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // For normal fields
      if (newErrors[name]) {
        delete newErrors[name];
      }

      // For nested nutritional facts
      if (NUTRITIONAL_FACTS.some((fact) => fact.key === name)) {
        const parent = "nutritionalFact";
        if (newErrors[parent] && newErrors[parent][name]) {
          delete newErrors[parent][name];
        }
      }

      return newErrors;
    });
  };

  const handleSave = async () => {
    const productPayload = {
      name: productDetails.name,
      manufacturer: productDetails.manufacturer,
      weight: productDetails.weight,
      nutritionalFact: productDetails.nutritionalFact,
      gtin: productDetails.gtin,
    };

    try {
      const response = await updateProductDetails(
        token,
        product.id,
        productPayload
      );
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", productDetails.photoUrl);
        await uploadProductImage(token, product.id, formData);
      }
      onUpdate(response.data);
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { details } = error.response.data;
        const validationErrors = {};
        let hasProductDetailsErrors = false;
        let hasNutritionalFactsErrors = false;

        // Organize errors into product details and nutritional facts
        details.forEach((errorMessage) => {
          const [field, message] = errorMessage.split(": ");
          if (field.includes(".")) {
            const [parent, child] = field.split(".");
            if (!validationErrors[parent]) validationErrors[parent] = {};
            validationErrors[parent][child] = message;

            // Check if the error is related to nutritional facts
            if (parent === "nutritionalFact") hasNutritionalFactsErrors = true;
          } else {
            validationErrors[field] = message;

            // Errors in product details (Tab 1)
            hasProductDetailsErrors = true;
          }
        });

        // Set form errors for displaying in the form
        setFormErrors(validationErrors);

        // If there are errors in product details (Tab 1), stay on or switch to Tab 1
        if (hasProductDetailsErrors) {
          setTabIndex(0); // Show Tab 1 (Product Details)
        } else if (hasNutritionalFactsErrors) {
          // If no errors in Product Details but errors exist in Nutritional Facts, switch to Tab 2
          setTabIndex(1);
        }
      } else {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setProductDetails((prev) => ({
        ...prev,
        photoUrl: file,
      }));
    }
  };

  const BACKEND_URL = "http://localhost:8080/";

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {text}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="md"
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "300px" }}
          >
            <CircularProgress />
          </Box>
        ) : (
          productDetails && (
            <>
              <DialogTitle
                sx={{
                  m: 0,
                  p: 2,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  color: "#333",
                }}
                id="customized-dialog-title"
              >
                Edit {productDetails.name}
              </DialogTitle>

              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>

              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                centered
              >
                <Tab label="Product Details" />
                <Tab label="Nutritional Facts" />
              </Tabs>

              <DialogContent dividers>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {selectedImage || productDetails.photoUrl ? (
                        <img
                          src={
                            selectedImage ||
                            `${BACKEND_URL}${productDetails.photoUrl}`
                          }
                          alt={productDetails.name}
                          style={{
                            width: "70%",
                            height: "auto",
                            maxHeight: "300px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <Typography variant="body1" color="textSecondary">
                          Image coming soon...
                        </Typography>
                      )}
                      {/* Image Upload Button */}
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange} // Use the handler to capture file input
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          color="primary"
                          sx={{ mt: 2 }}
                        >
                          Upload Image
                        </Button>
                      </label>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {tabIndex === 0 && (
                      <Box textAlign="center">
                        <TextField
                          label="Name"
                          name="name"
                          value={productDetails.name || ""}
                          onChange={handleInputChange}
                          error={!!formErrors.name}
                          helperText={formErrors.name || ""}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Manufacturer"
                          name="manufacturer"
                          value={productDetails.manufacturer || ""}
                          onChange={handleInputChange}
                          error={!!formErrors.manufacturer}
                          helperText={formErrors.manufacturer || ""}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Weight (g)"
                          name="weight"
                          type="number"
                          value={productDetails.weight || ""}
                          onChange={handleInputChange}
                          error={!!formErrors.weight}
                          helperText={formErrors.weight || ""}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Gtin-code"
                          name="gtin"
                          value={productDetails.gtin || ""}
                          onChange={handleInputChange}
                          error={!!formErrors.gtin}
                          helperText={formErrors.gtin || ""}
                          fullWidth
                          margin="normal"
                        />
                      </Box>
                    )}
                    {tabIndex === 1 && (
                      <Box textAlign="center">
                        <Box sx={{ textAlign: "left", margin: 0, padding: 0 }}>
                          {productDetails.nutritionalFact ? (
                            NUTRITIONAL_FACTS.map((fact) => {
                              const value =
                                productDetails.nutritionalFact[fact.key];
                              const error =
                                formErrors.nutritionalFact?.[fact.key];
                              const helperText = error ? error : "";
                              return (
                                <TextField
                                  key={fact.key}
                                  label={fact.label}
                                  name={fact.key}
                                  type="number"
                                  value={value || ""}
                                  onChange={handleInputChange}
                                  error={!!error} // Dynamically set the error prop
                                  helperText={helperText} // Dynamically set the helper text
                                  margin="normal"
                                  fullWidth
                                />
                              );
                            })
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              Nutritional facts are not available.
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>

              {/* Save Button */}
              <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
            </>
          )
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
