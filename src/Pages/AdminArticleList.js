import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { fetchArticles, deleteArticle } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";

const AdminArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    loadArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        setArticles(articles.filter((article) => article.id !== id));
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Manage Articles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create-article"
        >
          Create New Article
        </Button>
      </Box>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <ArticleCard
              article={article}
              
              admin
              onDelete={handleDelete}
              editLink={`/edit-article/${article.id}`}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminArticleList;
