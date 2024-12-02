import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  Divider,
  Box,
} from "@mui/material";
import { getArticleById, searchArticles } from "../api/articles";
import FeedbackList from "../components/FeedbackList";
import FeedbackForm from "../components/FeedbackForm";
import RecommendationList from "../components/RecommendationList";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackAdded, setFeedbackAdded] = useState(false); // Track feedback updates
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  // Fetch article details
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

  // Fetch recommendations for similar articles
  useEffect(() => {
    if (article) {
      const loadRecommendations = async () => {
        setRecommendationsLoading(true);
        try {
          const results = await searchArticles(article.title);
          setRecommendations(results);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        } finally {
          setRecommendationsLoading(false);
        }
      };

      loadRecommendations();
    }
  }, [article]);

  // Refresh feedback list on feedback addition
  const handleFeedbackAdded = () => {
    setFeedbackAdded((prev) => !prev);
  };

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
        <Toolbar style={{ backgroundColor: "#636ae8" }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Article Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Typography
          variant="body1"
          style={{ lineHeight: "1.8", marginBottom: "20px" }}
        >
          {article.content}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Feedback Section */}
        <Typography variant="h5" gutterBottom>
          Feedback
        </Typography>
        <FeedbackForm articleId={id} onFeedbackAdded={handleFeedbackAdded} />
        <FeedbackList articleId={id} feedbackAdded={feedbackAdded} />

        <Divider sx={{ my: 3 }} />

        {/* Recommendation Section */}
        <Typography variant="h5" gutterBottom>
          Recommended Articles
        </Typography>
        {recommendationsLoading ? (
          <CircularProgress />
        ) : (
          <RecommendationList recommendations={recommendations} />
        )}
      </Container>
    </>
  );
};

export default ArticleDetails;
