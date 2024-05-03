import useCalendar from "@hooks/useCalendar";
import Image from "next/image";
import { useState } from "react";

export default function ReviewCalendar({ date, setDate, setShowDate }) {
  const { weeks, currentDate, setPreviousMonth, setNextMonth, DAY_LABEL } =
    useCalendar();
  const [selectedDate, setSelectedDate] = useState(date);

  const isEqualDate = (d1, d2) => {
    return (
      d1?.getFullYear() === d2?.getFullYear() &&
      d1?.getMonth() === d2?.getMonth() &&
      d1?.getDate() === d2?.getDate()
    );
  };

  const handleSave = () => {
    setDate(selectedDate);
    setShowDate(false);
  };

  return (
    <div className="overflow-y-auto pb-[18px] bg-white">
      <div className="h-[48px] flex justify-between items-center px-[12px] py-[10px]">
        <div className="p-[8px]">
          <Image
            alt="뒤로가기"
            src={require("@images/close-gray.svg")}
            width={24}
            height={24}
            onClick={() => setShowDate(false)}
            className="cursor-pointer"
          />
        </div>
        <button
          className="font-sb text-[1.4rem] text-brand py-[10px] px-[12px]"
          onClick={handleSave}
        >
          저장
        </button>
      </div>

      <div className="flex justify-between pl-[64px] pr-[16px] pb-[12px] border-b border-b-[#C5C5C5]">
        <div className="flex flex-col gap-[8px]">
          <span className="font-m text-[1.4rem] text-[#555555]">
            방문 날짜 선택
          </span>
          <span className="font-b text-[2rem] text-[#161616]">
            {date?.getMonth() + 1}.{date?.getDate()}
          </span>
        </div>
        <div className="p-[8px] self-end">
          <Image
            alt=""
            src={require("@images/pencil-gray.svg")}
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 p-[12px]">
        {DAY_LABEL.map((v, i) => (
          <span
            key={i}
            className="text-[#161616] justify-self-center font-[Roboto]"
          >
            {v}
          </span>
        ))}
      </div>

      <div className="py-[16px] px-[12px] font-[Roboto]">
        <span className="py-[12px] px-[24px] text-[#555555] font-medium text-[1.4rem]">
          {currentDate.getMonth() + 1}월 {currentDate.getFullYear()}
        </span>
        <div className="grid grid-cols-7 grid-rows-5">
          {weeks.map((arr, i) =>
            arr.map((v, idx) => (
              <div
                key={`${i}-${idx}-${Math.random()}`}
                className="justify-self-center p-[4px] flex justify-center items-center"
              >
                <button
                  className={`h-[40px] w-[40px] rounded-full ${
                    isEqualDate(selectedDate, v.date)
                      ? "text-white bg-brand border border-brand"
                      : isEqualDate(currentDate, v.date)
                      ? "text-brand border border-brand"
                      : "text-[#161616]"
                  } ${v.day === 0 && "cursor-default"}}`}
                  disabled={v.day === 0}
                  onClick={() => setSelectedDate(v.date)}
                >
                  {v.day === 0 ? "" : v.day}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
