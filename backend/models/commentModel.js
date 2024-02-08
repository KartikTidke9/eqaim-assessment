import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 250,
    },
    user: {
      image: String,
      name: String,
      username: String,
    },
    replies: [
      {
        content: {
          type: String,
          required: true,
          trim: true,
          maxLength: 250,
        },
        replyingTo: {
          type: String,
          required: true,
        },
        user: {
          image: String,
          name: String,
          username: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

export { commentModel };
