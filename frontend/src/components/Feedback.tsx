import { useNavigate } from "react-router-dom";
import { type TFeedbacks } from "../store";
import Chip from "./Chip";
import Upvote from "./Upvote";

type Props = {
  feedback: TFeedbacks | null;
  clickable?: boolean;
};

function Feedback({ feedback, clickable = true }: Props) {
  const navigate = useNavigate();

  if (!feedback) {
    return <div className="text-lg font-bold text-center">Loading...</div>;
  }
  return (
    <div
      className="flex items-center justify-between mt-6 p-7 hover:cursor-pointer"
      onClick={() => {
        if (!clickable) return;
        navigate(`/feedback/${feedback._id}`);
      }}
    >
      <div className="flex items-center gap-10">
        {/* upvotes */}
        <div className="flex flex-col items-center justify-center w-10 gap-2 p-1 rounded-lg bg-color-12 hover:bg-color-13 hover:cursor-pointer">
          <Upvote
            nums={feedback.upvotes}
            className="text-sm font-bold"
            icon={
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 6l4-4 4 4"
                  stroke="#4661E6"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            }
          />
        </div>

        {/* details */}
        <div className="flex flex-col">
          <h5 className="font-bold text-color-7">{feedback.title}</h5>
          <span className="text-color-8">{feedback.description}</span>
          <span className="mt-2">
            <Chip children={feedback.category} />
          </span>
        </div>
        <div></div>
      </div>
      {/* comments */}
      <div className="flex items-center justify-center gap-2 p-1 text-center hover:bg-color-13 hover:cursor-pointer">
        <Upvote
          nums={feedback.comments.length}
          className="font-bold"
          icon={
            <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
                fill="#CDD2EE"
                fillRule="nonzero"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}

export default Feedback;
