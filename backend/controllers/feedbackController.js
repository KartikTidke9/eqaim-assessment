import { feedbackModel } from "../models/feedbackModel.js";

class FeedbackController {
  //...........................Add new feedback.....................................................
  static async addFeedback(req, res) {
    try {
      const { title, description, category } = req.body;

      if (!title || !description || !category) {
        throw new Error("fields can't be empty");
      }

      const feedback = new feedbackModel({
        title,
        description,
        category,
      });

      await feedback.save();

      res.status(201).json(feedback);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  //...........................Edit feedback.....................................................
  static async updateFeedback(req, res) {
    try {
      const { title, description, category, status } = req.body;
      const { id } = req.params;

      if (!id) {
        throw new Error("id param is required!");
      }

      if (!title || !description || !category || !status) {
        throw new Error("fields can't be empty");
      }

      const updatedFeedback = await feedbackModel.findByIdAndUpdate(
        id,
        {
          $set: { title, description, category, status },
        },
        { new: true }
      );

      res.status(201).json(updatedFeedback);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

export {FeedbackController}