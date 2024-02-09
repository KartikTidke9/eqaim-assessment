import { TFeedbacks } from "../store";
import OtherFeedback from "./OtherFeedback";

type TProps = {
  feedbacks: TFeedbacks[];
  status: string;
  description: string;
};

function RoadmapFeedback({ feedbacks, status, description }: TProps) {
  const renderedFeedbacks = feedbacks?.map((f) => {
    return <OtherFeedback key={f._id} feedback={f} status={status} />;
  });

  return (
    <>
      <div className="flex flex-col">
        <span className="font-bold text-color-7">
          {status} ({feedbacks?.length})
        </span>
        <small className="text-color-8">{description}</small>
      </div>
      <div className="mt-6">{renderedFeedbacks}</div>
    </>
  );
}

export default RoadmapFeedback;
