import { useNavigate } from "react-router-dom";
import { TFeedbacks } from "../store";
import Chip from "./Chip";
import Status from "./Status";
import Upvote from "./Upvote";

type TProps = {
  feedback: TFeedbacks;
  status?: string;
};

function OtherFeedback({ feedback, status }: TProps) {
    const navigate = useNavigate()
  return (
    <div
      className={`border-t-4 ${
        status === "Planned"
          ? "border-color-9"
          : status === "Live"
          ? "border-color-10"
          : "border-color-1"
      } p-4 flex flex-col items-start gap-2 hover:cursor-pointer hover:con`}
      onClick={()=> navigate(`/feedback/${feedback._id}`)}
    >
      <h5>
        <Status
          color={`${
            status === "Planned"
              ? "bg-color-9"
              : status === "Live"
              ? "bg-color-10"
              : "bg-color-1"
          }`}
          label={feedback.status}
        />
      </h5>
      <p className="font-bold text-color-7">{feedback.title}</p>
      <small className="text-color-7">{feedback.description}</small>

      {/* details */}
      <div>
        <Chip>{feedback.category}</Chip>
      </div>
      <div className="flex gap-40">
        <div className="flex items-center justify-center w-12 gap-2 p-1 rounded-lg bg-color-12 hover:bg-color-13 hover:cursor-pointer">
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
        <div className="flex items-center gap-2">
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
    </div>
  );
}

export default OtherFeedback;
