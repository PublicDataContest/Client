import useCalendar from "@hooks/useCalendar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ReviewCalendar({ date, setDate, setShowDate }) {
  const { yearlyCalendars, currentDate, DAY_LABEL } = useCalendar();
  const [selectedDate, setSelectedDate] = useState(date);
  const calendarRef = useRef(null);

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

  useEffect(() => {
    if (!calendarRef) return;
    calendarRef.current.scrollIntoView();
  }, [calendarRef]);

  return (
    <div className="relative h-full pb-[18px] bg-white">
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

      <div className="overflow-y-auto h-[480px] scrollbar-hide py-[16px] px-[12px] font-[Roboto] flex flex-col gap-[16px]">
        {yearlyCalendars.map((obj) => (
          <div
            key={`${Math.random()}`}
            ref={
              currentDate.getFullYear() === obj.year &&
              currentDate.getMonth() + 1 === obj.month
                ? calendarRef
                : null
            }
          >
            <span className="py-[12px] px-[24px] text-[#555555] font-medium text-[1.4rem]">
              {obj.month}월 {obj.year}
            </span>
            <div className="grid grid-cols-7 grid-rows-5">
              {obj.calendar.map((arr, i) =>
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
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[60px] pt-[8px] pb-[12px] px-[12px] flex justify-end bg-white border-t border-t-[#C5C5C5]">
        <div className="flex gap-[8px] items-center">
          <button
            className="py-[10px] px-[12px] text-[1.4rem] font-m text-brand"
            onClick={() => setShowDate(false)}
          >
            취소
          </button>
          <button
            className="py-[10px] px-[12px] text-[1.4rem] font-m text-brand"
            onClick={handleSave}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
