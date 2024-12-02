import axios from "axios";

const BASE_URL = "https://ikms-backend.onrender.com"; // Backend URL

export const fetchArticles = async () => {
  const response = await axios.get(`${BASE_URL}/articles`);
  return response.data;
};

export const fetchArticleDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/articles/${id}`);
  return response.data;
};
