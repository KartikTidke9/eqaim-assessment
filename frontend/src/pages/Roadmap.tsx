import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAppSelector } from "../hooks/hooks";
import RoadmapFeedback from "../components/RoadmapFeedback";
import { getGroupFeedbacks } from "../utils/getGroupFeedbackst";
import { fetchAllFeedbacks } from "../store";
import { useThunk } from "../hooks/useThunk";
import { useEffect } from "react";

function Roadmap() {
  const { otherFeedbacks } = useAppSelector((state) => state.feedbacks);
  const [
    doFetchOtherFeedbacks,
    loadingOtherFeedbacks,
    errorLoadingOtherFeedbacks,
  ] = useThunk(fetchAllFeedbacks);

  const navigate = useNavigate();

  useEffect(() => {
    //@ts-ignore
    doFetchOtherFeedbacks();
  }, [doFetchOtherFeedbacks]);

  return (
    <div className="absolute inset-x-[20%] my-10 flex flex-col">
      {/* //actions */}
      <div className="flex items-center justify-between p-6 rounded-lg bg-color-3">
        <div>
          {/* go Back */}
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center gap-4"
            labelClasses="font-bold text-xs opacity-50 text-color-4"
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
          <h1 className="font-bold text-color-4">Roadmap</h1>
        </div>
        {/* add feedback */}
        <Button
          onClick={() => navigate("/feedback/new")}
          className="flex items-center gap-4 px-6 py-2 rounded-lg bg-color-1"
          labelClasses="font-bold text-xs opacity-50 text-color-4"
          label="Add Feedback"
          icon={
            <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
              <text
                transform="translate(-24 -20)"
                fill="#F2F4FE"
                fillRule="evenodd"
                fontFamily="Jost-Bold, Jost"
                fontSize="16"
                fontWeight="bold"
              >
                <tspan x="24" y="30" className="font-extrabold">
                  +
                </tspan>
              </text>
            </svg>
          }
        />
      </div>
      {loadingOtherFeedbacks && (
        <div className="font-bold text-center">Loading...</div>
      )}
      {errorLoadingOtherFeedbacks && (
        <div className="font-bold text-center text-red-500">
          {String(errorLoadingOtherFeedbacks)}
        </div>
      )}
      {/* //planned feedbacks */}
      <div className="flex justify-between mt-6 gap-7">
        <div className="flex flex-col flex-grow">
          <RoadmapFeedback
            feedbacks={getGroupFeedbacks(otherFeedbacks)["Planned"]}
            status="Planned"
            description="Ideas prioritized for research"
          />
        </div>
        {/* //in-progress feedbacks */}
        <div className="flex flex-col flex-grow">
          <RoadmapFeedback
            feedbacks={getGroupFeedbacks(otherFeedbacks)["In-Progress"]}
            status="In-Progress"
            description="Currently being developed"
          />
        </div>
        {/* //live feedbacks */}
        <div className="flex flex-col flex-grow">
          <RoadmapFeedback
            feedbacks={getGroupFeedbacks(otherFeedbacks)["Live"]}
            status="Live"
            description="Released features"
          />
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
