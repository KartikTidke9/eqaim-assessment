type propsType = {
  color: string;
  label: string;
  status?: number;
};

function Status({ color, label, status }: propsType) {
  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <div className={`rounded-full w-2 h-2 ${color}`} />
        <label className="opacity-50">{label}</label>
      </div>
      <p className="font-bold opacity-50">{status}</p>
    </>
  );
}

export default Status;
