import { createAsyncThunk } from "@reduxjs/toolkit";
import { feedback } from "../api/feedback";

//fetch feeedback details
const fetchFeedbackDetails = createAsyncThunk("feedback/byId", async (id) => {
  try {
    const feedbackDetail = await feedback.get(`/${id}`);

    return feedbackDetail.data;
  } catch (e) {
    throw Error(e.response.data.message);
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
      throw Error(e.response.data.message);
    }
  }
);

//fetch all feedback without status suggestion
const fetchAllFeedbacks = createAsyncThunk(
  "feedback/status-not-suggestion",
  async () => {
    try {
      const feedbacks = await feedback.get("/all");

      return feedbacks.data;
    } catch (e) {
      throw Error(e.response.data.message);
    }
  }
);

//add new Feedback
const createFeedback = createAsyncThunk("feedback/new", async (data) => {
  try {
    const newFeedback = await feedback.post("/new", data);

    return newFeedback.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
});

//update Feedback
const updateFeedback = createAsyncThunk("feedback/update", async (data) => {
  try {
    const updatedFeedback = await feedback.put(`/update/${data.id}`, data);

    return updatedFeedback.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
});

//delete Feedback
const deleteFeedback = createAsyncThunk("feedback/delete", async (id) => {
  try {
    const deletedFeedback = await feedback.delete(`/delete/${id}`);

    return deletedFeedback.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
});

export {
  fetchFeedbackDetails,
  fetchFeedbacks,
  fetchAllFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback
};
