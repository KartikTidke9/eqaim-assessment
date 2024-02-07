import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      image: String,
      name: String,
      username: String,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

export { commentModel };
