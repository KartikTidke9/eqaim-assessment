import { TComments, TReplies } from "../store";
import Button from "./Button";

type Props<T> = {
  comment: T;
  replyingTo?: string;
};

function Comment<T extends TComments | TReplies>({
  comment,
  replyingTo,
}: Props<T>) {
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
            label="Reply"
            labelClasses="text-color-2 font-bold text-sm hover:text-color-8"
          />
        </div>
        <p className="flex">
            <span className="text-color-1">
              {replyingTo && `@${replyingTo}`}
              <span className={`text-color-8 ${replyingTo && "ms-4"}`}>{comment.content}</span>
            </span>
        </p>
      </div>
    </>
  );
}

export default Comment;
