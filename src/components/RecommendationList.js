import React from "react";
import { Typography, Grid } from "@mui/material";
import ArticleCard from "./ArticleCard";

const RecommendationList = ({ recommendations }) => {
  if (!Array.isArray(recommendations)) {
    console.log(recommendations.relevantArticles, "here");
    console.error("Recommendations is not an array:", recommendations);
    recommendations = recommendations.relevantArticles;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
      </Typography>
      <Grid container spacing={3}>
        {recommendations.length > 0 ? (
          recommendations.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No recommendations available.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default RecommendationList;
