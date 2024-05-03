import axiosInstance from "@api/axiosInstance";
import BottomTabNav from "@components/bottomTabNav";
import ListCard from "@components/listCard";
import useUserInfo from "@hooks/useUserInfo";
import { useEffect, useRef, useState } from "react";

export default function My() {
  const { userInfo } = useUserInfo();
  const [list, setList] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);
  const TAB_MENU = [
    { idx: 0, label: "찜한 가게", path: "wish-restaurant" },
    { idx: 1, label: "리뷰 쓴 가게", path: "reviews" },
  ];

  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };
  const handleMouseMove = (e) => {
    touchEndX.current = e.clientX;
  };
  const handleMouseUp = () => {
    if (touchStartX.current - touchEndX.current > 30) {
      // swipe left
      if (tabIdx < TAB_MENU.length - 1) {
        setTabIdx(tabIdx + 1);
      }
    }

    if (touchStartX.current - touchEndX.current < -30) {
      // swipe right
      if (tabIdx > 0) {
        setTabIdx(tabIdx - 1);
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 30) {
      // swipe left
      if (tabIdx < TAB_MENU.length - 1) {
        setTabIdx(tabIdx + 1);
      }
    }

    if (touchStartX.current - touchEndX.current < -30) {
      // swipe right
      if (tabIdx > 0) {
        setTabIdx(tabIdx - 1);
      }
    }
  };

  const getList = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/${userInfo.userId ?? localStorage.getItem("userId")}/${
          TAB_MENU[tabIdx].path
        }`
      );
      console.log("wish-restaurant or reviews", res);
      setList(res.data.data.content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    getList();
  }, [tabIdx]);

  return (
    <div
      className="relative overflow-y-auto bg-[#EFF1F4]"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex pt-[24px] px-[16px]">
        {TAB_MENU.map((v) => (
          <button
            key={v.idx}
            className={`w-full h-[37px] flex justify-center items-center ${
              tabIdx === v.idx
                ? "border-b-2 border-b-brand"
                : "border-b border-b-[#D5D8DC]"
            }`}
            onClick={() => setTabIdx(v.idx)}
          >
            <span
              className={`text-[1.4rem] ${
                tabIdx === v.idx ? "text-brand" : "text-[#9DA0A8]"
              }`}
            >
              {v.label}
            </span>
          </button>
        ))}
      </div>

      <div className="pt-[22px] px-[16px] flex flex-col gap-[12px]">
        <span className="font-b">2024.02.21</span>
        {list.map((v, i) => (
          <ListCard key={i} item={v} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
