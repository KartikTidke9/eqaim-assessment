import { feedbackModel } from "../models/feedbackModel.js";

const Categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
const Statuses = ["Suggestion", "Planned", "In-Progress", "Live"];

class FeedbackController {
  //...........................Add new feedback.....................................................
  static async addFeedback(req, res) {
    try {
      const { title, description, category } = req.body;

      if (!title || !description || !category) {
        throw new Error("fields can't be empty");
      }

      if (!Categories.includes(category)) {
        throw new Error("category can only be one of " + Categories.join(", "));
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

      if (!Categories.includes(category)) {
        throw new Error("category can only be one of " + Categories.join(", "));
      }

      if (!Statuses.includes(status)) {
        throw new Error("status can only be one of " + Statuses.join(", "));
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

  //...........................Delete feedback.....................................................
  static async deleteFeedback(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("id param is required!");
      }

      const deletedFeedback = await feedbackModel.findByIdAndDelete(id);
      res.status(201).json(deletedFeedback);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  //...........................Fetch feedback details by id...............................................
  static async fetchFeedbackById(req, res) {
    try {
      const { id } = req.params;
      const feedback = await feedbackModel.findById(id).populate("comments");

      res.status(201).json(feedback);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  //...........................Fetch feedback.....................................................
  //fetch all feedback which have status "Suggestion"
  static async fetchFeedbacksWithStatusSuggestion(req, res) {
    try {
      const feedbacks = await feedbackModel.find({ status: "Suggestion" });

      res.status(201).json(feedbacks);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  //...........................Fetch All feedbacks.....................................................
  //fetch all feedback which don't have status of "Suggestion"
  static async fetchFeedbacksWithoutStatusSuggestion(req, res) {
    try {
      const feedbacks = await feedbackModel.find({
        status: { $ne: "Suggestion" },
      });

      res.status(201).json(feedbacks);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

export { FeedbackController };
