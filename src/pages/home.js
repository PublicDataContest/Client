import BottomTabNav from "@components/bottomTabNav";
import DraggableCard from "@components/draggableCard";
import KakaoMap from "@components/kakaoMap";
import TagButton from "@components/tagButton";
import { DraggableCardDetail } from "@components/draggableCardDetail";
import { useEffect, useState } from "react";
import { getGu } from "@api/getGu";
import useUserInfo from "@hooks/useUserInfo";
import axiosInstance from "@api/axiosInstance";

export default function Home() {
  const { userInfo } = useUserInfo();
  const [selectedTag, setSelectedTag] = useState(0);
  const TAG_MENU = [
    { idx: 0, label: "음식점", path: "restaurants" },
    { idx: 1, label: "카페", path: "non-restaurants" },
    { idx: 2, label: "날씨추천", path: "gpt" },
  ];
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [content, setContent] = useState([]);
  const [selectedRId, setSelectedRId] = useState(null);
  const [gu, setGu] = useState("");
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [weather, setWeather] = useState([]);

  const getContent = async (gu) => {
    try {
      const res = await axiosInstance.get(
        `/api/api/map/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/${gu}/${TAG_MENU[selectedTag].path}`
      );
      console.log(
        `/api/map/{userId}/${gu}/${TAG_MENU[selectedTag].label}`,
        res
      );
      setContent(res.data.data.content);
    } catch (e) {
      // console.log(e.response.data.message);
    }
  };

  const setDefaultPos = () => {
    setGu("중구");
    setX(37.562338155889385);
    setY(126.97420654822417);
    getContent("중구");
  };

  const search = (e) => {
    e.preventDefault();

    if (keyword === "중구") {
      setDefaultPos();
    } else if (keyword === "중랑구") {
      setX(37.562338155889385);
      setY(126.97420654822417);
    }
    setGu(keyword);
  };

  const getWeather = async () => {
    try {
      const res = await axiosInstance.get(`/api/api/weather`);
      console.log(`weather`, res);
      setWeather(res.data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    const initPos = async () => {
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
    initPos();
    getWeather();
  }, []);

  useEffect(() => {
    if (!gu) return;
    getContent(gu);
  }, [gu, selectedTag]);

  return (
    <div className="relative overflow-y-auto">
      <div className="absolute top-0 left-0 w-full pt-[44px] z-10">
        <form
          className="px-[16px] relative before:content-locationIcon before:absolute before:top-[10px] before:left-[28px]"
          onSubmit={search}
        >
          <input
            className="w-full h-[44px] pl-[38px] pr-[12px] px-[12px] text-[1.4rem] text-[#3B3F4A] bg-white rounded-[10px] shadow-gray"
            placeholder="서울시의 구 이름을 검색해보세요! ex) 중구, 중랑구"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
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
            weather={weather}
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
