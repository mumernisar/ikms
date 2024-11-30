import axios from "axios";

export const getQuerySuggestions = async (query) => {
  try {
    const response = await axios.post("/api/search", { query });
    return response.data.suggestions || [];
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return [];
  }
};
