import BottomTabNav from "@components/bottomTabNav";
import DraggableCard from "@components/draggableCard";
import KakaoMap from "@components/kakaoMap";
import TagButton from "@components/tagButton";
import { DraggableCardDetail } from "@components/draggableCardDetail";
import { useState } from "react";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState(1);
  const TAG_MENU = [
    { idx: 1, label: "음식점" },
    { idx: 2, label: "카페" },
    { idx: 3, label: "날씨추천" },
  ];
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [content, setContent] = useState([]);
  const [selectedRId, setSelectedRId] = useState(null);

  return (
    <div className="relative overflow-y-auto">
      <div className="absolute top-0 left-0 w-full pt-[44px] z-10">
        <div className="px-[16px] relative before:content-locationIcon before:absolute before:top-[10px] before:left-[28px]">
          <input className="w-full h-[44px] pl-[38px] pr-[12px] px-[12px] text-[1.4rem] text-[#3B3F4A] bg-white rounded-[10px] shadow-gray" />
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

      <KakaoMap
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        content={content}
        setContent={setContent}
      />

      {selectedMarker !== null ? (
        <div className="absolute bottom-0 left-0 w-full z-20">
          <DraggableCardDetail
            restaurantId={content[selectedMarker].restaurantId}
          />
        </div>
      ) : (
        <div className="absolute bottom-[63px] left-0 w-full z-10">
          <DraggableCard content={content} setSelectedRId={setSelectedRId} />
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>

      {selectedRId !== null && (
        <div className="absolute bottom-0 left-0 w-full z-20">
          <DraggableCardDetail
            restaurantId={selectedRId}
            setSelectedRId={setSelectedRId}
            isSelected
          />
        </div>
      )}
    </div>
  );
}
