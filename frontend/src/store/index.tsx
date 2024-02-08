import { configureStore } from "@reduxjs/toolkit";
import { feedbackReducer, sortFeedbacks } from "./slices/feedbackSlice";
import {type TFeedbacks, type TComments, type TReplies} from "./slices/feedbackSlice"

const store = configureStore({
  reducer: {
    feedbacks: feedbackReducer,
  },
});

export const user = {
  image: "./assets/user-images/image-zena.jpg",
  name: "Zena Kelley",
  username: "velvetround",
};

export { store,sortFeedbacks };
export {type TFeedbacks, type TComments, type TReplies}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./thunks/feedbackThunk";
