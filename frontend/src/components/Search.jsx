import { useState, useMemo } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  Grid,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function Search({ setQuery, resetQuery }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleClearInput = () => {
    setInput("");

    resetQuery();
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        mt: 4,
        position: "relative",
      }}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by product name, manufacturer, or gtin"
              value={input}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: input && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearInput}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
