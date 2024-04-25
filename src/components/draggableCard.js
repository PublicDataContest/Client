import { useState, useRef } from "react";
import Card from "@component/components/card";

const LEVELS = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
};

const LEVEL_HEIGHTS = {
  [LEVELS.SMALL]: 10,
  [LEVELS.MEDIUM]: 30,
  [LEVELS.LARGE]: 76.5,
};

export default function DraggableCard() {
  const [level, setLevel] = useState(LEVELS.MEDIUM);
  const startY = useRef(0);
  const deltaY = useRef(0);

  const updateLevel = () => {
    if (deltaY.current > 0) {
      setLevel((prevLevel) =>
        prevLevel === LEVELS.SMALL ? LEVELS.SMALL : prevLevel - 1
      );
    } else if (deltaY.current < 0) {
      setLevel((prevLevel) =>
        prevLevel === LEVELS.LARGE ? LEVELS.LARGE : prevLevel + 1
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

  const handleTouchEnd = (e) => {
    updateLevel();
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      className="flex flex-col pt-[6px] pb-[14px] rounded-t-[20px] bg-white shadow-t-gray transition-[height] duration-75"
      style={{ height: `${LEVEL_HEIGHTS[level]}vh` }}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
    >
      <span className="pt-[22px] pb-[6px] px-[16px] font-[Pretendard-Bold]">
        내주변 공무원이 자주가는 맛집
      </span>
      <div className="pl-[16px] flex gap-[10px] overflow-x-auto scrollbar-hide">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
