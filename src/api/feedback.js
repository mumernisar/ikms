import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Create a feedback entry for a specific article
export const createFeedback = async (articleId, feedbackData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/articles/${articleId}/feedback`,
      feedbackData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating feedback:", error);
    throw error;
  }
};

// Get feedback for a specific article
export const getFeedbackByArticleId = async (articleId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/articles/${articleId}/feedback`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw error;
  }
};

// Delete a feedback entry
export const deleteFeedback = async (articleId, feedbackId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/articles/${articleId}/feedback/${feedbackId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    throw error;
  }
};

// Alias `createFeedback` as `postFeedback` for compatibility
export const postFeedback = createFeedback;
