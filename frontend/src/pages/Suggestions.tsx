import Chip from "../components/Chip";
import FeedbackBar from "../components/FeedbackBar";
import Status from "../components/Status";
import { useThunk } from "../hooks/useThunk";
import { fetchFeedbacks } from "../store";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import EmptyFeedback from "../components/EmptyFeedback";
import Feedback from "../components/Feedback";

type tagsType = {
  id: number;
  title: string;
  selected: boolean;
};

//tags.....
const tags: tagsType[] = [
  { id: 1, title: "All", selected: true },
  { id: 2, title: "UI", selected: false },
  { id: 3, title: "UX", selected: false },
  { id: 4, title: "Enhancement", selected: false },
  { id: 5, title: "Bug", selected: false },
  { id: 6, title: "Feature", selected: false },
];

//status......
const status = [
  { id: 1, color: "bg-color-9", label: "Planned", status: 2 },
  { id: 2, color: "bg-color-1", label: "InProgress", status: 3 },
  { id: 3, color: "bg-color-10", label: "Live", status: 1 },
];

function Suggestions() {
  const [doFetchFeedbacks, loadingFeedbacks, errorLoadingFeedbacks] =
    useThunk(fetchFeedbacks);
  const { feedbacks } = useAppSelector((state) => state.feedbacks);

  useEffect(() => {
    // @ts-ignore
    doFetchFeedbacks();
  }, [doFetchFeedbacks]);

  const renderedFeedbacks = feedbacks.map((f) => {
    return <Feedback key={f._id} feedback={f} />;
  });

  return (
    <div className="flex mx-12 mt-8 md:mt-24 md:mx-40 sm:mt-16 sm:mx-20 gap-7">
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
              <Chip key={t.id} selected={t.selected}>
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
            <span className="border-b hover:text-color-8 hover:cursor-pointer hover:border-b-color-8 text-color-2 border-b-color-2">
              View
            </span>
          </div>

          {/* content */}
          <div className="flex flex-col gap-2 mt-6">
            {status.map((s) => {
              return (
                <div className="flex items-center justify-between" key={s.id}>
                  <Status label={s.label} color={s.color} status={s.status} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ............................Main content............................ */}
      <div className="w-full">
        <div> 
          <FeedbackBar numOfFeedbacks={feedbacks.length} />
        </div>
        {feedbacks.length ? renderedFeedbacks : <EmptyFeedback />}
        {loadingFeedbacks && <div className="font-bold text-center">Loading...</div>}
        {errorLoadingFeedbacks && <div className="font-bold text-center text-red-500">{"Someting went wrong!"}</div>}
      </div>
    </div>
  );
}

export default Suggestions;
