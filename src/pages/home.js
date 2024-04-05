import BottomTabNav from "@component/components/bottomTabNav";
import Card from "@component/components/card";
import TagButton from "@component/components/tagButton";
import { useState } from "react";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState(1);
  const TAG_MENU = [
    { idx: 1, label: "거리순" },
    { idx: 2, label: "착한가게" },
    { idx: 3, label: "친환경" },
    { idx: 4, label: "친환경" },
    { idx: 5, label: "친환경" },
    { idx: 6, label: "친환경" },
    { idx: 7, label: "친환경" },
  ];

  return (
    <div className="relative h-[100vh]">
      <div className="absolute top-0 left-0 w-[375px] pt-[44px]">
        <div className="pl-[16px] relative before:content-locationIcon before:absolute before:top-[10px] before:left-[28px]">
          <input className="w-[343px] h-[44px] pl-[38px] pr-[12px] px-[12px] text-[1.4rem] text-[#3B3F4A] bg-white rounded-[10px] shadow-gray" />
        </div>
        <div className="pl-[16px] py-[10px] flex gap-[8px] overflow-x-auto scrollbar-hide">
          {TAG_MENU.map((v) => (
            <TagButton
              key={v.idx}
              label={v.label}
              active={v.idx === selectedTag}
              callbackFn={() => setSelectedTag(v.idx)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-[63px] left-0 w-full">
        <div className="flex flex-col pt-[6px] pb-[14px] h-[200px] rounded-t-[20px] bg-white shadow-t-gray">
          <div className="self-center w-[53px] h-[4px] bg-[#D5D8DC] rounded-[2px]" />
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
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <BottomTabNav />
      </div>
    </div>
  );
}
