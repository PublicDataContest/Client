import { useEffect } from "react";

export default function Toast({ setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast("");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex items-center rounded-[5px] bg-[#464343E5] h-[46px] px-[16px]">
      <p className="text-[1.3rem] text-white font-m">{text}</p>
    </div>
  );
}
