import { commentModel } from "../models/commentModel.js";
import { feedbackModel } from "../models/feedbackModel.js";

class CommentController {
  //...........................Add comment.....................................................
  static async addComment(req, res) {
    try {
      const {
        content,
        user: { image, name, username },
        id,
      } = req.body;

      if (!content) {
        throw new Error("content cannot be empty");
      }

      if (content.length > 250) {
        throw new Error("content msg cannot be more than 250 characters");
      }

      if (!image || !name || !username) {
        throw new Error(
          "user object needs to have name, image & username fields"
        );
      }

      const comment = new commentModel({
        content,
        user: {
          image,
          name,
          username,
        },
      });
      await comment.save();

      await feedbackModel.findByIdAndUpdate(id, {
        $push: { comments: comment._id },
      });

      res.status(201).json(comment);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  //...........................Reply to comment.....................................................
  static async addReply(req, res) {
    try {
      const {
        content,
        user: { image, name, username },
        replyingTo,
        id,
      } = req.body;

      if (!content) {
        throw new Error("content cannot be empty");
      }

      if (content.length > 250) {
        throw new Error("content msg cannot be more than 250 characters");
      }

      if (!image || !name || !username) {
        throw new Error(
          "user object needs to have name, image & username fields"
        );
      }

      const comment = await commentModel.findByIdAndUpdate(
        id,
        {
          $push: {
            replies: {
              content,
              replyingTo,
              user: {
                image,
                name,
                username,
              },
            },
          },
        },
        { new: true }
      );

      res.status(201).json(comment);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

export { CommentController };
