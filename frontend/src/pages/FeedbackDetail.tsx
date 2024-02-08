import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Feedback from "../components/Feedback";
import { Fragment, useEffect } from "react";
import { useThunk } from "../hooks/useThunk";
import { fetchFeedbackDetails } from "../store";
import { useAppSelector } from "../hooks/hooks";
import Comment from "../components/Comment";
import AddComment from "../components/AddComment";

function FeedbackDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dofetchDetails, loadingDetails, errorLoadingDetails, resetErrorLoadingDetails] =
    useThunk(fetchFeedbackDetails);
  const { activeFeedback: feedback } = useAppSelector(
    (state) => state.feedbacks
  );

  useEffect(() => {
    //@ts-ignore
    dofetchDetails(id);
  }, [dofetchDetails, id]);

  if (loadingDetails) {
    return <div className="text-lg font-bold text-center">Loading...</div>;
  }

  if (errorLoadingDetails) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-bold text-center text-red-500">
          {String(errorLoadingDetails)}
        </div>
        <Button
          onClick={() => {
            //@ts-ignore
            dofetchDetails(id);
            //@ts-ignore
            resetErrorLoadingDetails()
          }}
          label="Retry"
          className="px-8 py-4 rounded-3xl bg-color-2 text-color-4"
        />
      </div>
    );
  }

  const renderedComments = feedback?.comments.map((comment, i) => {
    if (typeof comment == "string") {
      return <Fragment key={i} />;
    }

    const name = comment.user.image.split("/").at(-1)?.trim();
    const imageSrc = require(`../assets/user-images/${name}`);

    return (
      <div key={comment._id} className="flex flex-col">
        <div className="flex gap-6">
          <div className="w-10 h-10 bg-black border rounded-full">
            <img
              src={imageSrc}
              alt={comment.user.name}
              className="inline-block w-full h-full rounded-full ring-1 ring-white"
            />
          </div>
          <Comment comment={comment} id={comment._id}/>
        </div>
        <div className="my-8 border" />
        <div className="flex flex-col gap-4">
          {comment.replies?.map((reply, i) => {
            const name = reply.user.image.split("/").at(-1)?.trim();
            const imageSrc = require(`../assets/user-images/${name}`);

            return (
              <div className="flex gap-6 ms-11" key={i}>
                <div className="w-10 h-10 bg-black border rounded-full">
                  <img
                    src={imageSrc}
                    alt={comment.user.name}
                    className="inline-block w-full h-full rounded-full ring-1 ring-white"
                  />
                </div>
                <Comment comment={reply} replyingTo={reply.user.username} id={comment._id}/>
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
            onClick={() => navigate("/feedback/edit", { state: feedback })}
            label="Edit Feedback"
            className="px-4 py-1 rounded-lg bg-color-2 hover:bg-color-8"
            labelClasses="font-bold text-color-4 text-xs"
          />
        </div>
        {/* details */}
        <div className="mt-6 rounded-lg bg-color-4">
          <Feedback feedback={feedback} clickable={false} />
        </div>
      </div>

      {/* comments */}
      <div className="flex flex-col rounded-lg bg-color-4 p-7">
        <span className="text-sm font-bold text-color-7">
          {feedback?.comments.length} comments
        </span>
        <div className="flex flex-col gap-8 my-7">{renderedComments}</div>
      </div>

      {/* //add comment box */}
      <div className="mb-6 text-sm font-bold rounded-lg bg-color-4 p-7">
        <AddComment id={feedback?._id}/>
      </div>
    </div>
  );
}

export default FeedbackDetail;
