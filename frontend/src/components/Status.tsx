type propsType = {
  color: string;
  label: string;
  count?: number;
};

function Status({ color, label, count }: propsType) {
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <div className={`rounded-full w-2 h-2 ${color}`} />
        <label className="text-color-7">{label}</label>
      </div>
      <p className="font-bold opacity-50">{count}</p>
    </>
  );
}

export default Status;
