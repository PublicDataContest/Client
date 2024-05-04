export default function LayerPopup({
  text,
  btnTextL,
  btnTextR,
  callbackFnL,
  callbackFnR,
}) {
  return (
    <div className="w-[323px] shadow-modal rounded-[10px] bg-[#EFF1F4]">
      <div className="h-[126px] flex justify-center items-center border-b border-b-[#D5D8DC]">
        <span className="font-m text-[1.8rem] text-[#3B3F4A]">{text}</span>
      </div>
      <div className="flex">
        <button
          className="w-full h-[47px] border-r border-r-[#D5D8DC]"
          onClick={callbackFnL}
        >
          <span className="font-b text-[#5A5E6A]">{btnTextL}</span>
        </button>
        <button className="w-full h-[47px]" onClick={callbackFnR}>
          <span className="font-b text-[#5A5E6A]">{btnTextR}</span>
        </button>
      </div>
    </div>
  );
}
