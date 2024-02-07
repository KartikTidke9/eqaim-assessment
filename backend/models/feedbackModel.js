import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Feature", "UI", "UX", "Enhancement", "Bug"],
      default: "Feature",
    },
    status: {
      type: String,
      enum: ["Suggestion", "Planned", "In-Progress", "Live"],
      default: "Suggestion",
    },
    upvotes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

const feedbackModel = mongoose.model("feedback", feedbackSchema);

export { feedbackModel };
