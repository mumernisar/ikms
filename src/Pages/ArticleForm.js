import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { fetchArticleDetails, saveArticle } from "../api/articles";

const ArticleForm = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch existing article data if editing
      const loadArticle = async () => {
        try {
          const article = await fetchArticleDetails(id);
          setTitle(article.title);
          setContent(article.content);
        } catch (error) {
          console.error("Error fetching article details:", error);
        } finally {
          setLoading(false);
        }
      };
      loadArticle();
    } else {
      setLoading(false); // No loading for new article creation
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveArticle({ id, title, content });
      navigate("/"); // Redirect back to admin article list
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  if (loading) {
    return (
      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Article" : "Create New Article"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={6}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Save Article
        </Button>
      </form>
    </Container>
  );
};

export default ArticleForm;
