import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { postFeedback } from "../api/feedback";

const FeedbackForm = ({ articleId, onFeedbackAdded }) => {
  const [feedbackContent, setFeedbackContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackContent.trim()) {
      alert("Feedback cannot be empty.");
      return;
    }

    setSubmitting(true);

    try {
      const feedback = {
        articleId,
        content: feedbackContent,
        createdAt: new Date().toISOString(),
        userId: "user1", // match the one in backend json file
      };

      await postFeedback(articleId, feedback);
      setFeedbackContent("");
      onFeedbackAdded(); // Notify parent to refresh feedback list
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Leave a Feedback"
        variant="outlined"
        fullWidth
        value={feedbackContent}
        onChange={(e) => setFeedbackContent(e.target.value)}
        multiline
        rows={4}
        disabled={submitting}
      />
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#636ae8" }}
        sx={{ mt: 2 }}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </Box>
  );
};

export default FeedbackForm;
