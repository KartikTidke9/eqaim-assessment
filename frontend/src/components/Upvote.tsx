import { ReactNode } from "react";

function Upvote({
  nums,
  icon,
  ...numProps
}: { nums: number; icon?: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {icon}
      <span {...numProps}>{nums}</span>
    </>
  );
}

export default Upvote;
