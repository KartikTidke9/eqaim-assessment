import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormControl from "../components/FormControl";
import Dropdown from "../components/Dropdown";
import { Data } from "../components/FeedbackBar";
import { useState } from "react";

const data: Data[] = [
  { id: 1, label: "Feature" },
  { id: 2, label: "UI" },
  { id: 3, label: "UX" },
  { id: 4, label: "Enhancement" },
  { id: 5, label: "Bug" },
];

const statusData: Data[] = [
  { id: 1, label: "Suggestion" },
  { id: 2, label: "Planned" },
  { id: 3, label: "In-Progress" },
  { id: 4, label: "Live" },
];

function EditFeedback() {
  const [selectedCategory, setSelectedCategory] = useState<Data>(data[0]);
  const [selectedStatus, setSelectedStatus] = useState<Data>(statusData[1]);
  const [title, setTitle] = useState({ title: "", error: "" });
  const [detail, setDetail] = useState({ detail: "", error: "" });

  const navigate = useNavigate();

  const handleAddFeedback = () => {
    const data = {
      category: selectedCategory,
      status: selectedStatus,
      title,
      detail,
    };

    if (!title.title) {
      setTitle({ ...title, error: "title cannot be empty!" });
      return;
    }

    if (!detail.detail) {
      setDetail({ ...detail, error: "title cannot be empty!" });
      return
    }

    setTitle({ title: "", error: "" });
    setDetail({ detail: "", error: "" });

    console.log(data);
  };

  return (
    <div className="absolute inset-x-[35%] my-10 flex flex-col ">
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
      {/* form */}
      <div className="relative p-10 mt-12 rounded-lg m bg-color-4">
        {/* plus icon */}
        <div className="absolute -top-6">
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient
                cx="103.9%"
                cy="-10.387%"
                fx="103.9%"
                fy="-10.387%"
                r="166.816%"
                id="a"
              >
                <stop stopColor="#E84D70" offset="0%" />
                <stop stopColor="#A337F6" offset="53.089%" />
                <stop stopColor="#28A7ED" offset="100%" />
              </radialGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <circle fill="url(#a)" cx="20" cy="20" r="20" />
              <path
                d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </g>
          </svg>
        </div>
        <div className="flex flex-col h-full gap-6">
          <h3 className="text-lg font-bold">Editing Title</h3>
          <FormControl
            labelClasses="text-sm flex flex-col font-bold"
            className="flex flex-col gap-4"
            label="Feedback Title"
            description="Add a short, descriptive headline"
            helperText={title.error && title.error}
            input={
              <input
                value={title.title}
                onChange={(e) => setTitle({ ...title, title: e.target.value })}
                className="p-2 rounded-lg outline-none bg-color-6"
              />
            }
          />
          <FormControl
            labelClasses="text-sm flex flex-col font-bold"
            className="relative z-30 flex flex-col gap-4"
            label="Category"
            description="Choose a category for your feedback"
            input={
              <Dropdown
                className="absolute z-30 grid w-full min-w-full grid-cols-1 mt-24 text-black divide-y rounded-lg shadow-2xl"
                selectedFieldClasses="bg-color-6 p-2 rounded flex items-center justify-between"
                data={data}
                selected={selectedCategory}
                onItemChange={setSelectedCategory}
              />
            }
          />
          <FormControl
            labelClasses="text-sm flex flex-col font-bold"
            className="relative z-20 flex flex-col gap-4"
            label="Update Status"
            description="Change feedback state"
            input={
              <Dropdown
                className="absolute z-20 grid w-full min-w-full grid-cols-1 mt-24 text-black divide-y rounded-lg shadow-2xl"
                selectedFieldClasses="bg-color-6 p-2 rounded flex items-center justify-between"
                data={statusData}
                selected={selectedStatus}
                onItemChange={setSelectedStatus}
              />
            }
          />
          <FormControl
            labelClasses="text-sm flex flex-col font-bold"
            className="relative z-10 flex flex-col gap-4"
            label="Feedback Detail"
            description="Include any specific comments on what should be improved, added, etc."
            helperText={detail.error && detail.error}
            input={
              <textarea
                value={detail.detail}
                onChange={(e) =>
                  setDetail({ ...detail, detail: e.target.value })
                }
                className="z-10 p-2 overflow-auto rounded-lg outline-none resize-none d bg-color-6 max-h-24"
                rows={10}
              />
            }
          />
        </div>

        {/* action buttons */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <Button
              label="Delete"
              className="px-4 py-1 rounded-lg bg-[#D73737] hover:bg-color-9"
              labelClasses="font-bold text-color-4 text-xs"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              label="Cancel"
              className="px-4 py-1 rounded-lg bg-color-7 hover:bg-color-8"
              labelClasses="font-bold text-color-4 text-xs"
              onClick={() => navigate(-1)}
            />
            <Button
              onClick={handleAddFeedback}
              label="Add Feedback"
              className="px-4 py-1 rounded-lg bg-color-1 hover:bg-color-11"
              labelClasses="font-bold text-color-4 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFeedback;
