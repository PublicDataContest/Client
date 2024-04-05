export default function TagButton({ label, active, callbackFn }) {
  return (
    <button
      className={`shrink-0 min-w-[69px] h-[30px] shadow-gray px-[16px] rounded-[15px] font-[Pretendard-Medium] text-[1.4rem] ${
        active ? "text-white bg-[#FF823C]" : "text-[#9DA0A8] bg-white"
      }`}
      onClick={callbackFn}
    >
      {label}
    </button>
  );
}
