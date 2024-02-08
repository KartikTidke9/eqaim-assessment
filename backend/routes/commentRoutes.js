import express from "express";
import { CommentController } from "../controllers/commentController.js";

const router = express.Router();

router.post("/add", CommentController.addComment)
router.post("/reply", CommentController.addReply)

export default router;
