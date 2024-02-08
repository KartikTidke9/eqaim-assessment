import { createAsyncThunk } from "@reduxjs/toolkit";
import { comment } from "../api/comment";

//add comment
const addComment = createAsyncThunk("comment/add", async (data) => {
  try {
    const commentDetail = await comment.post("/add", data);

    return commentDetail.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
});

//add reply
const addReply = createAsyncThunk("reply/add", async (data) => {
  try {
    const reply = await comment.post("/reply", data);

    return reply.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
});

export { addComment, addReply };
