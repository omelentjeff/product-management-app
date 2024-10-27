import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { fetchSearchData } from "../apiService";
import { useAuth } from "../hooks/AuthProvider";
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

/**
 * Search component that provides a text input field for searching
 * products by name or GTIN, displaying suggestions as the user types.
 *
 * @param {Object} props - The component props.
 * @param {function} props.setQuery - Function to set the query for the search.
 * @param {function} props.resetQuery - Function to reset the search query.
 * @returns {JSX.Element} The rendered Search component.
 */
export default function Search({ setQuery, resetQuery }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { token } = useAuth();

  /**
   * Fetch suggestions from the API with a debounce to limit the number
   * of API calls while typing.
   */
  const fetchSuggestions = useMemo(
    () =>
      debounce(async (value) => {
        if (value) {
          try {
            const result = await fetchSearchData(token, value);
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

  /**
   * Handles input changes in the search field and fetches suggestions.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e) => {
    setInput(e.target.value);
    fetchSuggestions(e.target.value);
  };

  /**
   * Clears the input field and resets suggestions and query.
   */
  const handleClearInput = () => {
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    resetQuery();
  };

  /**
   * Handles click on a suggestion to populate the input and set the query.
   *
   * @param {Object} suggestion - The selected suggestion.
   */
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
              placeholder="Search by name or gtin"
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
