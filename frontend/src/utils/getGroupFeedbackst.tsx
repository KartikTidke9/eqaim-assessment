import { type TFeedbacks } from "../store";

const getGroupFeedbacks = (
  feedbacks: TFeedbacks[]
): { [key: string]: TFeedbacks[] } => {
  const groupedData: { [key: string]: TFeedbacks[] } = {};

  feedbacks.forEach((f) => {
    if (!groupedData.hasOwnProperty(f.status)) {
      groupedData[f.status] = [{...f}];
    } else {
      groupedData[f.status].push(f);
    }
  });

  return groupedData;
};

export { getGroupFeedbacks };
