import BottomTabNav from "@component/components/bottomTabNav";
import { CardDetail } from "@component/components/cardDetail";
import DraggableCard from "@component/components/draggableCard";
import KakaoMap from "@component/components/kakaoMap";
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
  const [selectedMarker, setSelectedMarker] = useState(null);
  // 마커가 표시될 위치입니다
  const positions = [
    {
      x: 33.450705,
      y: 126.570677,
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0hN_nLSpS_aVeocPQehBsoYqLEOk1P48YGkziQj6Fg&s",
      title: "냉면맛집",
      category: "한식",
      distance: "80m",
      starCnt: 0,
      reviewCnt: 0,
      address: "서울 은평구 백련산로2길 19",
      isOpen: true,
      openTime: "매일 00:00 - 24:00",
    },
    {
      x: 33.450936,
      y: 126.569477,
      imgUrl:
        "https://i.namu.wiki/i/8s7OaNPsZ8KC1e8RQ6QZEwgfFUoIVVOIm0jA72-UO6Imw0OgI1aEK_DulMeXWbg4tstts3IQFMJS0jmYKD9rzQ.webp",
      title: "라면맛집",
      category: "일식",
      distance: "90m",
      starCnt: 3,
      reviewCnt: 0,
      address: "서울 은평구 백련산로2길 19",
      isOpen: true,
      openTime: "매일 00:00 - 24:00",
    },
    {
      x: 33.450879,
      y: 126.56994,
      imgUrl:
        "https://i.namu.wiki/i/xT2u3IXASDp4OB4qkTn14yrtyb6qYcIpEJBvrCJ6EfWAA4NMlGKbxxZa42Yjt_j6eLdTmNzd_Z7dXpnU5RpSJg11JPwGXy0FYeM7e4O1N4KLCuHj8GrJF6l-xOfDvoEPGu9l2IG-UTw60Axb7O9jpA.webp",
      title: "빵맛집",
      category: "베이커리",
      distance: "110m",
      starCnt: 3,
      reviewCnt: 0,
      address: "서울 은평구 백련산로2길 19",
      isOpen: true,
      openTime: "매일 00:00 - 24:00",
    },
    {
      x: 33.451393,
      y: 126.570738,
      imgUrl:
        "https://i.namu.wiki/i/lP9fTPdfSfPobmhPua5FtkdR7-ufWmAn8DDayYdVRiEiZmal22ywpqV_BpNmI4Ti1qdqG4uYhheSH7WMAYFd3gKMohm9S437fjSFEy06SjMu5plpReMbrgD5M7jrndVtU2dAzpGZRNplfvtV4-nHOg.webp",
      title: "샐러드맛집",
      category: "한식",
      distance: "400m",
      starCnt: 3,
      reviewCnt: 0,
      address: "서울 은평구 백련산로2길 19",
      isOpen: false,
      openTime: "매일 00:00 - 24:00",
    },
  ];

  return (
    <div className="relative h-[100vh] overflow-y-auto">
      <div className="absolute top-0 left-0 w-[375px] pt-[44px] z-10">
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

      <KakaoMap
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        positions={positions}
      />

      {selectedMarker !== null ? (
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="relative before:content-barGrayIcon before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:z-20">
            <CardDetail item={positions[selectedMarker]} />
          </div>
        </div>
      ) : (
        <div className="absolute bottom-[63px] left-0 w-full z-10">
          <div className="relative before:content-barGrayIcon before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:z-10">
            <DraggableCard />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
