import React, { useState, useCallback } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import debounce from "lodash.debounce";
import { getQuerySuggestions } from "../api/ai"; // Adjust the path if needed


const SearchBar = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced input handler to reduce API calls
  const handleInputChange = useCallback(
    debounce(async (input) => {
      if (input.length > 2) {
        setLoading(true);
        try {
          // Fetch AI suggestions here if needed
          const aiSuggestions = await getQuerySuggestions(input); // Replace with actual API call if integrated
          setSuggestions(aiSuggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300), // Wait 300ms before making the API call
    []
  );

  const handleChange = (e) => {
    const input = e.target.value;
    onChange(e);
    handleInputChange(input);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        label="Search Articles"
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={handleChange}
      />
      {loading && (
        <CircularProgress
          size={20}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
          }}
        />
      )}
      {suggestions.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            borderRadius: "4px",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                onChange({ target: { value: suggestion } });
                setSuggestions([]); // Clear suggestions after selecting one
              }}
            >
              <ListItemText
                primary={suggestion}
                primaryTypographyProps={{
                  style: { fontSize: "0.9rem", fontWeight: 500 },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchBar;
