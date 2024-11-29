import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import { getArticleById } from "../api/articles";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticleDetails = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticleDetails();
  }, [id]);

  if (loading) {
    return (
      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!article) {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          Article not found.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Article Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body1" style={{ lineHeight: "1.8" }}>
          {article.content}
        </Typography>
      </Container>
    </>
  );
};

export default ArticleDetails;
