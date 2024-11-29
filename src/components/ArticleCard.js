import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ArticleCard = ({ article, admin, onDelete, editLink }) => {
  return (
    <Card
      style={{
        border: "1px solid #e0e0e0",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out", // Add hover effect
        cursor: "pointer",
      }}
      onClick={() => (window.location.href = `/article/${article.id}`)} // Redirect to details page on click
    >
      <CardContent style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            color: "#1976d2",
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginBottom: "15px", height: "60px", overflow: "hidden" }}
        >
          {article.content.slice(0, 100)}...
        </Typography>
        <Box display="flex" justifyContent="space-between">
          {admin && (
            <Button
              component={Link}
              to={editLink || "#"}
              variant="outlined"
              color="primary"
              onClick={(e) => e.stopPropagation()} // Prevent navigation
            >
              Edit
            </Button>
          )}
          {admin && (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation
                onDelete(article.id);
              }}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
