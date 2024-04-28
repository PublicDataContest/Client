import { CardDetail } from "@components/cardDetail";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LEVEL_HEIGHTS = [65, 100];

export function DraggableCardDetail({
  item,
  menu,
  showMenu,
  setShowMenu,
  isFull,
  setIsFull,
  season,
  time,
  price,
  people,
}) {
  const [level, setLevel] = useState(0);
  const startY = useRef(0);
  const deltaY = useRef(0);
  const [stickyHeader, setStickyHeader] = useState(false);

  useEffect(() => {
    setIsFull(level === LEVEL_HEIGHTS.length - 1);
  }, [level]);

  const updateLevel = () => {
    if (isFull) {
      setStickyHeader(deltaY.current < 0);
      return;
    }
    if (deltaY.current > 0 && level > 0) {
      setLevel((prev) => prev - 1);
    } else if (deltaY.current < 0 && level < LEVEL_HEIGHTS.length - 1) {
      setLevel((prev) => prev + 1);
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
      className={`flex flex-col pb-[69px] relative ${
        isFull ||
        "rounded-t-[20px] before:content-barGrayIcon before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:z-20"
      } overflow-hidden bg-white shadow-t-gray transition-[height] duration-75`}
      style={{ height: `${LEVEL_HEIGHTS[level]}vh` }}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
    >
      {isFull &&
        (stickyHeader ? (
          <div className="absolute top-0 left-0 py-[8px] px-[16px] bg-white/80 z-20 w-full flex justify-end">
            <Image
              alt="닫기"
              src={require("@images/close-gray.svg")}
              width={24}
              height={24}
              onClick={() => setLevel((prev) => prev - 1)}
            />
          </div>
        ) : (
          <Image
            alt="닫기"
            src={require("@images/close-white.svg")}
            width={24}
            height={24}
            className="absolute top-[8px] right-[16px] z-20"
            onClick={() => setLevel((prev) => prev - 1)}
          />
        ))}
      <CardDetail
        item={item}
        menu={menu}
        isFull={isFull}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        season={season}
        time={time}
        price={price}
        people={people}
      />
    </div>
  );
}
