import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchFeedbackDetails, fetchFeedbacks } from "../thunks/feedbackThunk";

type TUser = {
  image: string;
  name: string;
  username: string;
};

export type TReplies = TUser & {
  content: string;
  user: TUser;
  replyingTo: string;
};

export type TComments = {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  replies?: TReplies[];
};

export type TFeedbacks = {
  _id: string;
  upvotes: number;
  title: string;
  status: string;
  description: string;
  category: string;
  comments: TComments[] | string[];
  createdAt: string;
  updatedAt: string;
};

type InitialState = {
  feedbacks: TFeedbacks[] | [];
  activeFeedback: TFeedbacks | null;
};

const initialState: InitialState = {
  feedbacks: [],
  activeFeedback: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    //sorting feebacks based on payload type
    sortFeedbacks(state, action: PayloadAction<string>) {
      const sortby = action.payload;
      //sorting logic
      const sort = (a: TFeedbacks, b: TFeedbacks): any => {
        if (sortby === "Least Upvoted") {
          return a.upvotes - b.upvotes;
        }
        if (sortby === "Most Upvoted") {
          return b.upvotes - a.upvotes;
        }
        if (sortby === "Most Comments") {
          return b.comments.length - a.comments.length;
        }
        if (sortby === "Least Comments") {
          return a.comments.length - b.comments.length;
        }
      };

      state.feedbacks = state.feedbacks.sort(sort);
    },
  },
  extraReducers(builder) {
    //fetch feedback detail
    builder.addCase(
      fetchFeedbackDetails.fulfilled,
      (state, action: PayloadAction<TFeedbacks>) => {
        state.activeFeedback = action.payload;
      }
    );

    //load all the feedback with status suggestion
    builder.addCase(
      fetchFeedbacks.fulfilled,
      (state, action: PayloadAction<TFeedbacks[]>) => {
        state.feedbacks = action.payload;
      }
    );
  },
});

export const { sortFeedbacks } = feedbackSlice.actions;
export const feedbackReducer = feedbackSlice.reducer;
