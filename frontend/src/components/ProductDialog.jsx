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
import { useAuth } from "../hooks/AuthProvider";

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
  { label: "Energy", key: "energy", unit: "kcal/kJ" },
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

/**
 * StationDialog Component - A dialog displaying product details and nutritional facts.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.product - The product data to display.
 * @param {string} props.text - The text to display on the button that opens the dialog.
 * @returns {JSX.Element} The rendered dialog component.
 */
export default function StationDialog({ product, text }) {
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { token } = useAuth();

  /**
   * Opens the dialog and fetches product details from the API.
   *
   * @async
   * @function handleClickOpen
   */
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

  /**
   * Closes the dialog and resets product details and tab index.
   *
   * @function handleClose
   */
  const handleClose = () => {
    setOpen(false);
    setProductDetails(null);
    setTabIndex(0);
  };

  /**
   * Handles tab changes within the dialog.
   *
   * @param {Object} event - The event object.
   * @param {number} newValue - The new value for the tab index.
   * @function handleTabChange
   */
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
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
                {productDetails.name}
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
                <Tab label="Nutritional Facts / 100g" />
              </Tabs>

              <DialogContent dividers>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {/* Left: Image */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent="center"
                  >
                    {productDetails.photoUrl &&
                    productDetails.photoUrl !== "http://example.com" ? (
                      <img
                        src={`${BACKEND_URL}${productDetails.photoUrl}`}
                        alt={productDetails.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "300px",
                          objectFit: "contain",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    ) : (
                      <Typography variant="body1" color="textSecondary">
                        Image coming soon...
                      </Typography>
                    )}
                  </Grid>

                  {/* Right: Content Based on Tab */}
                  <Grid item xs={12} md={6}>
                    {tabIndex === 0 && (
                      <Box>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              sx={{ fontWeight: "bold" }}
                            >
                              Name:
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {productDetails.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              sx={{ fontWeight: "bold" }}
                            >
                              Manufacturer:
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {productDetails.manufacturer}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              sx={{ fontWeight: "bold" }}
                            >
                              Weight:
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {productDetails.weight}g
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              sx={{ fontWeight: "bold" }}
                            >
                              GTIN:
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {productDetails.gtin}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    {tabIndex === 1 && (
                      <Box>
                        <Grid container spacing={3}>
                          {productDetails.nutritionalFact ? (
                            NUTRITIONAL_FACTS.map((fact) => {
                              const value =
                                productDetails.nutritionalFact[fact.key];

                              if (fact.key === "energy") {
                                // Combine kcal and kJ for the Energy field
                                const energyKcal =
                                  productDetails.nutritionalFact.calories;
                                const energyKj =
                                  productDetails.nutritionalFact.kilojoules;

                                if (energyKcal !== null && energyKj !== null) {
                                  return (
                                    <Grid item xs={6} key={fact.key}>
                                      <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        {fact.label}:
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        color="textSecondary"
                                      >
                                        {energyKcal} kcal / {energyKj} kJ
                                      </Typography>
                                    </Grid>
                                  );
                                }
                              } else {
                                if (value !== null) {
                                  return (
                                    <Grid item xs={6} key={fact.key}>
                                      <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        {fact.label}:
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        color="textSecondary"
                                      >
                                        {value} {fact.unit}
                                      </Typography>
                                    </Grid>
                                  );
                                }
                              }
                              return null; // Skip rendering for null values
                            })
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              Nutritional facts are not available.
                            </Typography>
                          )}
                        </Grid>
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
