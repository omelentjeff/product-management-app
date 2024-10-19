import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { fetchSearchData } from "../apiService";
import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function Search({ setQuery, resetQuery }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (value) => {
        if (value) {
          try {
            const result = await fetchSearchData(value);
            console.log("Suggestions:", result.content);
            setSuggestions(result.content);
            setShowSuggestions(true);
          } catch (error) {
            console.error("Error fetching suggestions:", error);
          }
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }, 300), // 300ms debounce
    [] // Dependencies: empty array ensures the function is created only once
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleClearInput = () => {
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    resetQuery();
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    setInput(suggestion.name);
    setQuery(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
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
              placeholder="Enter a station name"
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

        {/* Suggestion dropdown */}
        {showSuggestions && (
          <Paper
            elevation={3}
            sx={{
              position: "absolute", // Make it float over the content
              top: "64px", // Adjust to align with the input field height
              width: "100%", // Ensure the suggestions fit the input field's width
              zIndex: 10,
              maxHeight: 400, // Limit the max height
              overflowY: "auto", // Add scrolling for long suggestion lists
              borderRadius: 1,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
            }}
          >
            <List dense>
              {suggestions.length === 0 ? (
                <ListItem>
                  <ListItemText>No results found</ListItemText>
                </ListItem>
              ) : (
                suggestions.map((suggestion, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText primary={suggestion.name} />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        )}
      </form>
    </Box>
  );
}
