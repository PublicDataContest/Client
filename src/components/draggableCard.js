import { useState, useRef, useEffect } from "react";
import Card from "@components/card";
import Image from "next/image";
import useCalendar, { DAY_LABEL_KO } from "@hooks/useCalendar";

const LEVELS = {
  SMALL: 0,
  MEDIUM: 1,
  // LARGE: 2,
};

const LEVEL_HEIGHTS = {
  [LEVELS.SMALL]: 10,
  [LEVELS.MEDIUM]: 30,
  // [LEVELS.LARGE]: 76.5,
};

export default function DraggableCard({
  content,
  setSelectedRId,
  gu,
  weather,
}) {
  const [level, setLevel] = useState(LEVELS.MEDIUM);
  const startY = useRef(0);
  const deltaY = useRef(0);
  const { currentDate } = useCalendar();

  const updateLevel = () => {
    if (deltaY.current > 0) {
      setLevel((prevLevel) =>
        prevLevel === LEVELS.SMALL ? LEVELS.SMALL : prevLevel - 1
      );
    } else if (deltaY.current < 0) {
      setLevel((prevLevel) =>
        prevLevel === LEVELS.MEDIUM ? LEVELS.MEDIUM : prevLevel + 1
      );
    }
  };

  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    deltaY.current = e.clientY - startY.current;
    startY.current = e.clientY;
  };

  const handleMouseUp = () => {
    updateLevel();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    deltaY.current = e.touches[0].clientY - startY.current;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    updateLevel();
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  // content 영역을 슬라이드할 때는 card의 드래그 이벤트 방지
  const handleMouseDownC = (e) => {
    e.stopPropagation();
  };

  const handleTouchStartC = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {}, []);

  return (
    <div
      className="relative before:content-barGrayIcon before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:z-10
      flex flex-col pt-[6px] pb-[14px] rounded-t-[20px] bg-white shadow-t-gray transition-[height] duration-75"
      style={{ height: `${LEVEL_HEIGHTS[level]}vh` }}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
    >
      <div className="px-[16px]">
        <div className="pt-[10px] pb-[6px] flex justify-between items-center border-b border-b-[#E4E6EA]">
          <div className="flex items-center gap-[4px] text-[#3B3F4A] font-sb">
            <Image
              alt=""
              src={
                weather[1]?.value === "1"
                  ? require("@images/weather-1.svg")
                  : weather[1]?.value === "3"
                  ? require("@images/weather-3.svg")
                  : require("@images/weather-4.svg")
              }
              width={28}
              height={28}
            />
            <span className="pl-[2px]">{weather[0]?.value}°</span>
            <span>/</span>
            <span>
              {weather[2]?.value === "강수없음"
                ? "강수없음"
                : `${weather[2]?.value}mm`}
            </span>
          </div>
          <div className="flex items-center gap-[4px] text-[1.4rem] font-sb">
            <span className="text-[#3B3F4A]">
              {DAY_LABEL_KO[currentDate.getDay() - 1]}요일
            </span>
            <span className="text-[#7F828C]">
              {currentDate.getMonth() + 1}월
            </span>
            <span className="text-[#7F828C]">{currentDate.getDate()}일</span>
          </div>
        </div>
      </div>

      <span className="pt-[22px] pb-[6px] px-[16px] font-[Pretendard-Bold]">
        내주변 공무원이 자주가는 맛집
      </span>
      {content.length ? (
        <div
          className="px-[16px] flex gap-[10px] overflow-x-auto scrollbar-hide"
          onTouchStart={handleTouchStartC}
          onMouseDown={handleMouseDownC}
        >
          {content.map((item, i) => (
            <div
              className="cursor-pointer"
              key={i}
              onClick={() => setSelectedRId(item.restaurantId)}
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="leading-[3rem] text-[1.4rem] text-[#7F828C] text-center">
            아직 {gu && `${gu}에는`} 맛집 데이터가 모이지 않았어요.
            <br />
            상단 검색창을 통해 서울시의 구 이름을 검색해 주세요.
          </p>
        </div>
      )}
    </div>
  );
}
