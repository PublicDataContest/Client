import BottomTabNav from "@components/bottomTabNav";
import DraggableCard from "@components/draggableCard";
import KakaoMap from "@components/kakaoMap";
import TagButton from "@components/tagButton";
import { DraggableCardDetail } from "@components/draggableCardDetail";
import { useEffect, useState } from "react";
import { getGu } from "@api/getGu";

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
  const [gu, setGu] = useState("");
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  useEffect(() => {
    const setDefaultPos = () => {
      setGu("중구");
      setX(37.562338155889385);
      setY(126.97420654822417);
    };

    const initGu = async () => {
      if (navigator.geolocation) {
        const success = async (position) => {
          const x = position.coords.latitude; // 위도
          const y = position.coords.longitude; // 경도

          const gu = await getGu(x, y);
          console.log("gu", gu);
          setGu(gu);
          setX(x);
          setY(y);
        };
        const error = () => {
          console.log("error in navigator.geolocation.getCurrentPosition");
          setDefaultPos();
        };
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        setDefaultPos();
      }
    };
    initGu();
  }, []);

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

      {gu && x !== null && y !== null && (
        <KakaoMap
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          content={content}
          setContent={setContent}
          gu={gu}
          x={x}
          y={y}
        />
      )}

      {selectedMarker !== null ? (
        <div className="absolute bottom-0 left-0 w-full z-20">
          <DraggableCardDetail
            restaurantId={content[selectedMarker].restaurantId}
          />
        </div>
      ) : (
        <div className="absolute bottom-[63px] left-0 w-full z-10">
          <DraggableCard
            content={content}
            setSelectedRId={setSelectedRId}
            gu={gu}
          />
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
