import express from "express";

import { FeedbackController } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/new", FeedbackController.addFeedback);
router.put("/update/:id", FeedbackController.updateFeedback);

export default router