import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Fetch all articles
export const getArticles = async () => {
  const response = await axios.get(`${BASE_URL}/articles`);
  console.log(response, "resonse");
  return response.data;
};

// Fetch article details by ID
export const getArticleById = async (id) => {
  const response = await axios.get(`${BASE_URL}/articles/${id}`);
  return response.data;
};

// Create a new article
export const createArticle = async (article) => {
  const response = await axios.post(`${BASE_URL}/articles`, article);
  return response.data;
};

export const saveArticle = async (article) => {
  if (article.id) {
    // Update if ID exists
    return await updateArticle(article.id, article);
  } else {
    // Create if no ID
    return await createArticle(article);
  }
};
// Update an existing article
export const updateArticle = async (id, article) => {
  const response = await axios.put(`${BASE_URL}/articles/${id}`, article);
  return response.data;
};

// Delete an article
export const deleteArticle = async (id) => {
  const response = await axios.delete(`${BASE_URL}/articles/${id}`);
  return response.data;
};

export const fetchArticles = async () => {
  const response = await axios.get(`${BASE_URL}/articles`);
  return response.data;
};

export const fetchArticleDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/articles/${id}`);
  return response.data;
};
export const searchArticles = async (query) => {
  const response = await axios.post(`${BASE_URL}/articles/search`, {
    query,
  });
  return response.data;
};
