import express from "express";

import { FeedbackController } from "../controllers/feedbackController.js";

const router = express.Router();

//create a new feedback
router.post("/new", FeedbackController.addFeedback);

//update the feedback
router.put("/update/:id", FeedbackController.updateFeedback);

//delete the feedback
router.delete("/delete/:id", FeedbackController.deleteFeedback);

//load all feedback with status of suggestion
router.get(
  "/all/suggestion",
  FeedbackController.fetchFeedbacksWithStatusSuggestion
);

//load all feedback without status of suggestion
router.get("/all", FeedbackController.fetchFeedbacksWithoutStatusSuggestion);



//fetch feedback details
router.get("/:id", FeedbackController.fetchFeedbackById);

export default router;
