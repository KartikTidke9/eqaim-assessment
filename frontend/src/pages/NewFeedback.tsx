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

function NewFeedback() {
  const [selectedCategory, setSelectedCategory] = useState<Data>(data[0]);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("")
  const [detail, setDetail] = useState("");
  const [detailError, setDetailError] = useState("")

  const navigate = useNavigate();

  const addFeedback=()=>{
    if(!title){
      setTitleError("title cant be empty!");
      return
    }
    if(!detail){
      setDetailError("detail cant be empty!");
      return
    }

    setTitle("")
    setTitleError("")
    setDetail("")
    setDetailError("")
    console.log({category: selectedCategory.label, title:title, detail: detail});
  }

  return (
    <div className="absolute inset-x-[35%] inset-y-[5%] my-10 flex flex-col ">
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
              fill-rule="evenodd"
            />
          </svg>
        }
      />
      {/* form */}
      <div className="relative p-10 mt-12 rounded-lg m bg-color-4">
        {/* plus icon */}
        <div className="absolute -top-6">
      <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a"><stop stopColor="#E84D70" offset="0%"/><stop stopColor="#A337F6" offset="53.089%"/><stop stopColor="#28A7ED" offset="100%"/></radialGradient></defs><g fill="none" fillRule="evenodd"><circle fill="url(#a)" cx="28" cy="28" r="28"/><path fill="#FFF" fillRule="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"/></g></svg>
        </div>
        <div className="flex flex-col h-full gap-6">
        <h3 className="text-lg font-bold">Create New Feedback</h3>
        <FormControl
          labelClasses="text-sm flex flex-col font-bold"
          className="flex flex-col gap-4"
          label="Feedback Title"
          description="Add a short, descriptive headline"
          helperText={titleError && titleError}
          input={
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded-lg outline-none bg-color-6"
            />
          }
        />
        <FormControl
          labelClasses="text-sm flex flex-col font-bold"
          className="relative flex flex-col gap-4"
          label="Category"
          description="Choose a category for your feedback"
          input={
            <Dropdown
              className="absolute z-20 grid w-full min-w-full grid-cols-1 mt-24 text-black divide-y rounded-lg shadow-2xl"
              selectedFieldClasses="bg-color-6 p-2 rounded flex items-center justify-between"
              data={data}
              selected={selectedCategory}
              onItemChange={setSelectedCategory}
            />
          }
        />
        <FormControl
          labelClasses="text-sm flex flex-col font-bold"
          className="z-10 flex flex-col gap-4"
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
          helperText={detailError && detailError}
          input={
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="p-2 overflow-auto rounded-lg outline-none resize-none d bg-color-6 max-h-24"
              rows={10}
            />
          }
        />
        </div>

      {/* action buttons */}
      <div className="flex justify-end gap-4">
        <Button label="Cancel" className="px-4 py-1 rounded-lg bg-color-7 hover:bg-color-8" labelClasses="font-bold text-color-4 text-xs" onClick={()=> navigate(-1)}/>
        <Button label="Add Feedback" className="px-4 py-1 rounded-lg bg-color-1 hover:bg-color-11" labelClasses="font-bold text-color-4 text-xs" onClick={addFeedback} />
      </div>
      </div>

    </div>
  );
}

export default NewFeedback;
