import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Feedback from "../components/Feedback";
import { Fragment, useEffect } from "react";
import { useThunk } from "../hooks/useThunk";
import { fetchFeedbackDetails } from "../store";
import { useAppSelector } from "../hooks/hooks";
import Comment from "../components/Comment";

function FeedbackDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dofetchDetails, loadingDetails, errorLoadingDetails] =
    useThunk(fetchFeedbackDetails);
  const { activeFeedback: feedback } = useAppSelector(
    (state) => state.feedbacks
  );

  useEffect(() => {
    //@ts-ignore
    dofetchDetails(id);
  }, [dofetchDetails, id]);

  const renderedComments = feedback?.comments.map((comment, i) => {
    if (typeof comment == "string") {
      return <Fragment key={i} />;
    }
    return (
      <div key={comment._id} className="flex flex-col">
        <div className="flex gap-6">
          <div className="w-10 h-10 bg-black border rounded-full">
            {/* <img src={"." + comment.user.image} alt={comment.user.name} /> */}
          </div>
          <Comment comment={comment} />
        </div>
        <div className="my-8 border" />
        <div className="flex flex-col gap-4">
          {comment.replies?.map((reply, i) => {
            return (
              <div className="flex gap-6 ms-11" key={i}>
                <div className="w-10 h-10 bg-black border rounded-full">
                  {/* <img src={"." + comment.user.image} alt={comment.user.name} /> */}
                </div>
                <Comment comment={comment} replyingTo={reply.user.username} />
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="absolute inset-x-[27%] my-10 flex flex-col gap-6">
      {/* //actions */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between ">
          {/* go Back */}
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center gap-4"
            labelClasses="font-bold text-xs opacity-50"
            label="Go Back"
            icon={
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 9L2 5l4-4"
                  stroke="#4661E6"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            }
          />

          {/* edit feedback */}
          <Button
            label="Edit Feedback"
            className="px-4 py-1 rounded-lg bg-color-2 hover:bg-color-8"
            labelClasses="font-bold text-color-4 text-xs"
          />
        </div>
        {/* details */}
        <div>
          <Feedback feedback={feedback} clickable={false} />
        </div>
      </div>

      {/* comments */}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-color-7">
          {feedback?.comments.length} comments
        </span>
        <div className="flex flex-col gap-8 mt-7">{renderedComments}</div>
      </div>
    </div>
  );
}

export default FeedbackDetail;
