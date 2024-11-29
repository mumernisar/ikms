import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { getArticles, searchArticles } from "../api/articles";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    loadArticles();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setLoading(true);
      try {
        const relevantArticles = await searchArticles(query);
        setFilteredArticles(relevantArticles); // Update filtered articles
      } catch (error) {
        console.error("Error performing AI search:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredArticles(articles); // Reset to all articles
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Explore Articles
      </Typography>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredArticles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ArticleList;
