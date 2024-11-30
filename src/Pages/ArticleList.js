import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { getArticles, searchArticles } from "../api/articles";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce Timeout Ref
  const debounceTimeoutRef = useRef(null);

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles();
        console.log("All Articles:", data); // Debugging: Check fetched articles
        setArticles(data);
        setFilteredArticles(data); // Default display is all articles
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Handle search input with debounce
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true);
        try {
          const articles = await searchArticles(query.trim());
          const relevantArticles = articles.relevantArticles;
          console.log("Filtered Articles:", relevantArticles); // Debugging: Check filtered articles
          setFilteredArticles([...relevantArticles]); // Force array update to trigger render
        } catch (error) {
          console.error("Error performing AI search:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredArticles([...articles]); // Show all articles if query is cleared or too short
      }
    }, 300); // Adjust debounce delay as needed
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: "center", marginTop: "20px", color: "#1976d2" }}
      >
        Explore Articles
      </Typography>
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for articles..."
      />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : filteredArticles.length > 0 ? (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {filteredArticles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginTop: "20px", color: "#757575" }}
        >
          No articles found. Try a different search term.
        </Typography>
      )}
    </Container>
  );
};

export default ArticleList;
