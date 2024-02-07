import { useState } from "react";
import { type Data } from "./FeedbackBar";

type propType = {
  data: Data[];
  selected: Data;
  onItemChange: (obj: Data) => void;
  selectedFieldClasses?: string;
};

function Dropdown({
  data,
  selected,
  onItemChange,
  selectedFieldClasses,
  ...divProps
}: propType & React.HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => setIsOpen(!isOpen);

  
  const onItemClick = (d: Data) => {
    setIsOpen(false);
    const data = { ...d, selected: true };
    onItemChange(data);
  };

  return (
    <>
      <div onClick={onClick} className={selectedFieldClasses}>
        <p className="select-none">{selected.label}</p>
        {!isOpen ? (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4 4-4"
              stroke="#4661E6"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
        ) : (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke="#4661E6"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
        )}
      </div>
      {isOpen && (
        <div {...divProps}>
          {data.map((d) => {
            return (
              <span
                key={d.id}
                onClick={() => onItemClick(d)}
                className="flex items-center justify-between px-4 py-3 font-bold hover:text-color-1 hover:cursor-pointer"
              >
                <p className="select-none opacity-55">{d.label}</p>
                {selected.id === d.id && (
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="11"
                    >
                      <path
                        fill="none"
                        stroke="#AD1FEA"
                        strokeWidth="2"
                        d="M1 5.233L4.522 9 12 1"
                      />
                    </svg>
                  </p>
                )}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Dropdown;
