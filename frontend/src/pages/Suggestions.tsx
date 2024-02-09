import Chip from "../components/Chip";
import FeedbackBar from "../components/FeedbackBar";
import Status from "../components/Status";
import { useThunk } from "../hooks/useThunk";
import { fetchAllFeedbacks, fetchFeedbacks } from "../store";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import EmptyFeedback from "../components/EmptyFeedback";
import Feedback from "../components/Feedback";
import { useNavigate } from "react-router-dom";
import { getGroupFeedbacks } from "../utils/getGroupFeedbackst";

type tagsType = {
  id: number;
  title: string;
};

//tags.....
const tags: tagsType[] = [
  { id: 1, title: "All" },
  { id: 2, title: "UI" },
  { id: 3, title: "UX" },
  { id: 4, title: "Enhancement" },
  { id: 5, title: "Bug" },
  { id: 6, title: "Feature" },
];

//status......
const status = [
  { id: 1, color: "bg-color-9", label: "Planned", count: 2 },
  { id: 2, color: "bg-color-1", label: "In-Progress", count: 3 },
  { id: 3, color: "bg-color-10", label: "Live", count: 1 },
];

function Suggestions() {
  const [doFetchFeedbacks, loadingFeedbacks, errorLoadingFeedbacks] =
    useThunk(fetchFeedbacks);
  const [
    doFetchOtherFeedbacks,
    loadingOtherFeedbacks,
    errorLoadingOtherFeedbacks,
  ] = useThunk(fetchAllFeedbacks);
  const { feedbacks, otherFeedbacks } = useAppSelector(
    (state) => state.feedbacks
  );
  // getFeedbacksWithOtherStatus(otherFeedbacks)
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(tags[0]);

  useEffect(() => {
    // @ts-ignore
    doFetchFeedbacks();
    // @ts-ignore
    doFetchOtherFeedbacks();
  }, [doFetchFeedbacks, doFetchOtherFeedbacks]);

  //filtering feedback by category
  const renderedFeedbacks = [...feedbacks]
    .filter(
      (m) =>
        selectedCategory.title === "All" ||
        m.category === selectedCategory.title
    )
    .map((f) => {
      return <Feedback key={f._id} feedback={f} />;
    });

  return (
    <div className="flex mx-12 mt-8 md:mt-26 md:mx-40 sm:mt-14 sm:mx-20 gap-7">
      {/* ............................side bar............................ */}
      <div className="flex flex-col w-32 gap-6 md:w-60">
        {/* logo */}
        <div className="bg-gradient-to-tr from-[#28A7ED] via-[#A337F6] to-[#E84D70] rounded-lg w-[100%] md:h-36 h-16 relative">
          <div className="absolute text-white bottom-2 start-2 md:bottom-6 md:start-6">
            <p className="font-bold">Eqaim</p>
            <p className="text-xs">Feedback Board</p>
          </div>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-3">
          {tags.map((t: tagsType) => {
            return (
              <Chip
                key={t.id}
                selected={selectedCategory}
                tag={t}
                onChange={setSelectedCategory}
              >
                {t.title}
              </Chip>
            );
          })}
        </div>

        {/* roadmap */}
        <div>
          {/* header */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-color-7">Roadmap</span>
            <span
              className="border-b hover:text-color-8 hover:cursor-pointer hover:border-b-color-8 text-color-2 border-b-color-2"
              onClick={() => navigate("/feedback/roadmap")}
            >
              View
            </span>
          </div>

          {/* status list with count */}

          {errorLoadingOtherFeedbacks && (
            <div className="mt-10 text-xs font-bold text-center text-red-500">
              {String(errorLoadingOtherFeedbacks)}
            </div>
          )}
          {loadingOtherFeedbacks ? (
            <div className="mt-10 text-sm font-bold text-center">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-6">
              {status.map((s) => {
                return (
                  <div className="flex items-center justify-between" key={s.id}>
                    <Status
                      label={s.label}
                      color={s.color}
                      count={getGroupFeedbacks(otherFeedbacks)[s.label]?.length}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ............................Main content............................ */}
      <div className="w-full">
        <div>
          <FeedbackBar numOfFeedbacks={feedbacks.length} />
        </div>
        {feedbacks.length ? renderedFeedbacks : <EmptyFeedback />}
        {loadingFeedbacks && (
          <div className="font-bold text-center">Loading...</div>
        )}
        {errorLoadingFeedbacks && (
          <div className="font-bold text-center text-red-500">
            {"Someting went wrong!"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
