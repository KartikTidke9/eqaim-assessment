import { ReactNode } from "react";

type props = {
  input: ReactNode,
  label: string,
  description: string,
  labelClasses?: string,
  helperText?: string | null,
};

function FormControl({
  input,
  label,
  description,
  labelClasses,
  helperText,
  ...divProps
}: props & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...divProps}>
      <div className={labelClasses}>
        <label className="opacity-75">{label}</label>
        <small className="opacity-50">
          <em>{description}</em>
        </small>
      </div>
      {input}

      {/* //helper text */}
      {helperText && <p className="text-xs text-red-500">Helper text</p>}
    </div>
  );
}

export default FormControl;
