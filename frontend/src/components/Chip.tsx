type tagsType = {
  id: number;
  title: string;
};

type chipProps = {
  children: any;
  selected?: tagsType;
  onChange?: React.Dispatch<React.SetStateAction<tagsType>>;
  tag?: tagsType;
};

function Chip({
  children,
  onChange,
  selected = { id: 1, title: "All" },
  tag
}: chipProps) {
  const handleChange = () => {
    //@ts-ignore
    onChange(tag);
  };

  return selected.id === tag?.id?  (
    <span className="px-4 py-1 text-xs text-center text-white rounded-lg bg-color-2 md:text-base">
      {children}
    </span>
  ) : (
    <span
      onClick={handleChange}
      className="text-center text-color-2 bg-color-5 px-4 py-1 rounded-lg text-xs md:text-base hover:bg-[#CFD7FF] hover:cursor-pointer"
    >
      {children}
    </span>
  );
}

export default Chip;
