import { createAsyncThunk } from "@reduxjs/toolkit";
import { feedback } from "../api/feedback";

//fetch feeedback details
const fetchFeedbackDetails = createAsyncThunk("feedback/byId", async (id) => {
  try {
    const feedbackDetail = await feedback.get(`/${id}`);

    return feedbackDetail.data;
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch feedback");
  }
});

//fetch all feedback with status suggestion
const fetchFeedbacks = createAsyncThunk(
  "feedback/status-suggestion",
  async () => {
    try {
      const feedbacks = await feedback.get("/all/suggestion");

      return feedbacks.data;
    } catch (e) {
      console.log(e);
      throw Error("Failed to fetch feedback");
    }
  }
);

const fetchAllFeedbacks = createAsyncThunk(
  "feedback/status-not-suggestion",
  async () => {
    try {
      const feedbacks = await feedback.get("/all");

      return feedbacks.data;
    } catch (e) {
      console.log(e);
      throw Error("Failed to fetch feedback");
    }
  }
);

export { fetchFeedbackDetails, fetchFeedbacks, fetchAllFeedbacks };
