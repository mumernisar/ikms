import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getFeedbackByArticleId } from "../api/feedback";

const FeedbackList = ({ articleId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await getFeedbackByArticleId(articleId);
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, [articleId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (feedbacks.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No feedback available for this article.
      </Typography>
    );
  }

  return (
    <List>
      {feedbacks.map((feedback) => (
        <ListItem key={feedback.id} alignItems="flex-start" divider>
          <ListItemText
            primary={feedback.content}
            secondary={
              <Typography variant="body2" color="textSecondary">
                Posted by User {feedback.userId} on{" "}
                {new Date(feedback.createdAt).toLocaleString()}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FeedbackList;
