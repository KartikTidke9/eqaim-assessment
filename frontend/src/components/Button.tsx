import { ReactNode } from "react";

type props = {
  label: string;
  icon?: ReactNode;
  iconClasses?: string;
  labelClasses?: string;
};

function Button({
  icon,
  label,
  iconClasses,
  labelClasses,
  ...nativeProps
}: props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...nativeProps}>
      <span className={iconClasses}>{icon}</span>
      <span className={labelClasses}>{label}</span>
    </button>
  );
}

export default Button;
