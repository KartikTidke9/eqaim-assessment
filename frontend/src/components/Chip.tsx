type chipProps = {
  children: any;
  selected?: boolean;
};

function Chip({ children, selected = false }: chipProps) {
  return selected ? (
    <span className="px-4 py-1 text-xs text-center text-white rounded-lg bg-color-2 md:text-base">
      {children}
    </span>
  ) : (
    <span className="text-center text-color-2 bg-color-5 px-4 py-1 rounded-lg text-xs md:text-base hover:bg-[#CFD7FF] hover:cursor-pointer">
      {children}
    </span>
  );
}

export default Chip;
