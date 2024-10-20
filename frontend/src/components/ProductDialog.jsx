import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Grid, CircularProgress, Tabs, Tab } from "@mui/material";
import { fetchSingleData } from "../apiService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Define the nutritional facts object
const NUTRITIONAL_FACTS = [
  { label: "Calories per 100g", key: "caloriesPer100g", unit: "kcal" },
  { label: "Kilojoules per 100g", key: "kilojoulesPer100g", unit: "kJ" },
  { label: "Fat", key: "fat", unit: "g" },
  { label: "Carbohydrates", key: "carbohydrates", unit: "g" },
  { label: "Sugars", key: "sugars", unit: "g" },
  { label: "Polyols", key: "polyols", unit: "g" },
  { label: "Fibers", key: "fibers", unit: "g" },
  { label: "Protein", key: "protein", unit: "g" },
  { label: "Sodium", key: "sodium", unit: "mg" },
  { label: "Vitamin C", key: "vitaminC", unit: "mg" },
  { label: "Calcium", key: "calcium", unit: "mg" },
];

export default function StationDialog({ product, text }) {
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0); // To handle the tab switching

  const handleClickOpen = async () => {
    setOpen(true);
    setIsLoading(true);

    try {
      const details = await fetchSingleData(product.id);
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

  // Backend URL (adjust as per your backend's address)
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
              {/* Dialog Title */}
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
                {productDetails.name}
              </DialogTitle>

              {/* Close Button */}
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

              {/* Tabs at the top */}
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

              {/* Main Content */}
              <DialogContent dividers>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {/* Left: Image */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent="center"
                  >
                    <img
                      src={`${BACKEND_URL}${productDetails.photoUrl}`}
                      alt={productDetails.name}
                      style={{
                        width: "70%",
                        height: "auto",
                        maxHeight: "300px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>

                  {/* Right: Content Based on Tab */}
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
                        <Typography variant="h6" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Manufacturer: {productDetails.manufacturer}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Weight: {productDetails.weight}g
                        </Typography>
                      </Box>
                    )}
                    {tabIndex === 1 && (
                      <Box textAlign="center">
                        <Typography variant="h6" gutterBottom>
                          Nutritional Facts
                        </Typography>
                        <Box sx={{ textAlign: "left", margin: 0, padding: 0 }}>
                          {NUTRITIONAL_FACTS.map((fact) => {
                            const value =
                              productDetails.nutritionalFact[fact.key];
                            // Skip if the value is null
                            if (value !== null) {
                              return (
                                <Typography
                                  variant="body1"
                                  color="textSecondary"
                                  key={fact.key}
                                >
                                  {fact.label}: {value} {fact.unit}
                                </Typography>
                              );
                            }
                            return null; // Skip rendering for null values
                          })}
                        </Box>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
