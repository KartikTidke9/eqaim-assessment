import { useEffect, useState } from "react";
import { TComments, TReplies, addReply, user } from "../store";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";

type Props<T> = {
  comment: T;
  replyingTo?: string;
  id: string;
};

function Comment<T extends TComments | TReplies>({
  comment,
  id,
  replyingTo,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [doAddReply, loadingAddReply, , , isDoAddReplyRan] = useThunk(addReply);

  
  const handelToggle = () => setIsOpen(!isOpen);

  const handleReply = () => {
    const data = {
      content: text,
      user,
      id,
      replyingTo: comment.user.username,
    };
    //@ts-ignore
    doAddReply(data);

    setText("");
  };

  useEffect(() => {
    if (isDoAddReplyRan) {
      setIsOpen(false);
    }
  }, [isDoAddReplyRan]);

  return (
    <>
      {/* avatar */}
      {/* comment details */}
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-between">
          {/* user details */}
          <div>
            <h5 className="text-sm font-bold text-color-7">
              {comment.user.name}
            </h5>
            <span className="text-xs text-color-8">
              @{comment.user.username}
            </span>
          </div>
          <Button
            onClick={handelToggle}
            label={loadingAddReply ? "..." : "Reply"}
            labelClasses="text-color-2 font-bold text-sm hover:text-color-8"
            disabled={loadingAddReply as boolean}
          />
        </div>
        <p className="flex">
          <span className="text-color-1">
            {replyingTo && `@${replyingTo}`}
            <span className={`text-color-8 ${replyingTo && "ms-4"}`}>
              {comment.content}
            </span>
          </span>
        </p>

        {/* reply  */}
        {isOpen && (
          <div className="flex items-start justify-between">
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="px-6 w-[80%] py-4 text-base font-normal outline-color-2 resize-none max-h-20 bg-color-6 text-color-7"
              maxLength={250}
              placeholder="Type your reply here"
            />
            <Button
              onClick={handleReply}
              label="Post Reply"
              className="px-6 py-2 rounded-lg bg-color-1 hover:bg-color-11"
              labelClasses="font-bold text-color-4 text-xs"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Comment;
