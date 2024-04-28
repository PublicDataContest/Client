import BottomTabNav from "@components/bottomTabNav";
import DraggableCard from "@components/draggableCard";
import KakaoMap from "@components/kakaoMap";
import TagButton from "@components/tagButton";
import { DraggableCardDetail } from "@components/draggableCardDetail";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReviewWrite from "@components/reviewWrite";
import axiosInstance from "@api/axiosInstance";
import useUserInfo from "@hooks/useUserInfo";

export default function Home() {
  const { userInfo } = useUserInfo();
  const [writeReview, setWriteReview] = useState(false);
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
  const [content, setContent] = useState([]);
  const [detailContent, setDetailContent] = useState(null);

  const getDetailContent = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/card/${userInfo.userId ?? localStorage.getItem("userId")}/${
          content[selectedMarker].restaurantId
        }`
      );
      console.log(res);
      const { data } = res.data;
      setDetailContent(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    if (!selectedMarker) return;
    getDetailContent();
  }, [selectedMarker]);

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
        content={content}
        setContent={setContent}
      />

      {selectedMarker !== null ? (
        <>
          <div className="absolute bottom-0 left-0 w-full z-20">
            <DraggableCardDetail item={detailContent} />
          </div>

          <div className="absolute bottom-0 left-0 w-full z-20">
            <div className="bg-white pt-[8px] pb-[18px] px-[16px]">
              <button
                className="w-full bg-[#FF823C] h-[43px] rounded-[10px] flex gap-[8px] items-center justify-center"
                onClick={() => setWriteReview(true)}
              >
                <Image
                  alt=""
                  src={require("@images/pencil-white.svg")}
                  width={16}
                  height={16}
                  priority
                />
                <span className="text-white font-[Pretendard-SemiBold]">
                  리뷰 쓰기
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute bottom-[63px] left-0 w-full z-10">
          <DraggableCard content={content} />
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>

      {writeReview && (
        <div className="absolute top-0 left-0 w-full z-30">
          <ReviewWrite setWriteReview={setWriteReview} />
        </div>
      )}
    </div>
  );
}
