import { commentModel } from "../models/commentModel.js";
import { feedbackModel } from "../models/feedbackModel.js";

class CommentController {
  //...........................Add comment.....................................................
  static async addComment(req, res) {
    try {
      const { content, user, id } = req.body;

      if (!content || !user) {
        throw new Error("content cannot be empty");
      }

      const comment = new commentModel({
        content,
        user,
      });
      await feedback.save();

      await feedbackModel.findByIdAndUpdate(id, {
        $push: { comments: comment._id },
      });

      res.status(201).json(comment);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  //...........................Edit comment.....................................................
//   static async updateFeedback(req, res) {
//     try {
//       const { title, description, category, status } = req.body;
//       const { id } = req.params;

//       if (!id) {
//         throw new Error("id param is required!");
//       }

//       if (!title || !description || !category || !status) {
//         throw new Error("fields can't be empty");
//       }

//       const updatedFeedback = await feedbackModel.findByIdAndUpdate(
//         id,
//         {
//           $set: { title, description, category, status },
//         },
//         { new: true }
//       );

//       res.status(201).json(updatedFeedback);
//     } catch (err) {
//       res.status(401).json({ message: err.message });
//     }
//   }
}

export { CommentController };
