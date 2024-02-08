import { useState } from "react";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import { addComment, user } from "../store";

function AddComment({ id }: { id: string | undefined }) {
  const [comment, setComment] = useState("");
  const [doAddComment, loadingAddComment, errorLoadingAddComment] =
    useThunk(addComment);

  const handlePostComment = () => {
    const data = {
      content: comment,
      user,
      id,
    };

    if (!comment) return;
    //@ts-ignore
    doAddComment(data);
    setComment("")
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 250) {
      setComment(text);
    }
  };

  return (
    <>
      <h5 className="mb-6 text-color-7">Add comment</h5>
      <textarea
        onChange={handleCommentChange}
        value={comment}
        className="w-full px-6 py-4 text-base font-normal outline-none resize-none max-h-20 bg-color-6 text-color-7"
        maxLength={250}
        placeholder="Type your comment here"
      />
      <div className="flex items-center justify-between">
        <p className="text-color-8">
          {Math.abs(comment.length - 250)} Characters left
        </p>
        {errorLoadingAddComment && (
          <p className="text-xs font-bold text-red-500">
            {String(errorLoadingAddComment)}
          </p>
        )}
        <Button
          onClick={handlePostComment}
          label={loadingAddComment ? "Posting..." : "Post Comment"}
          className="px-6 py-3 rounded-lg bg-color-1 hover:bg-color-11"
          labelClasses="font-bold text-color-4 text-xs"
          disabled={loadingAddComment as boolean}
        />
      </div>
    </>
  );
}

export default AddComment;
