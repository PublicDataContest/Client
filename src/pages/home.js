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
import MenuList from "@components/menuList";
import ReviewList from "@components/reviewList";

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
  const [menu, setMenu] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [season, setSeason] = useState(null);
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(null);
  const [people, setPeople] = useState(null);
  const [review, setReview] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const getDetailContent = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/card/${userInfo.userId ?? localStorage.getItem("userId")}/${
          content[selectedMarker].restaurantId
        }`
      );
      console.log("detailContent", res);
      const { data } = res.data;
      setDetailContent(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getMenu = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/menu/${userInfo.userId ?? localStorage.getItem("userId")}/${
          content[selectedMarker].restaurantId
        }`
      );
      console.log("menu", res);
      const { data } = res.data;
      setMenu(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getSeason = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/statistics/season/${content[selectedMarker].restaurantId}`
      );
      console.log("season", res);
      const { data } = res.data;
      setSeason(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getTime = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/statistics/time/${content[selectedMarker].restaurantId}`
      );
      console.log("time", res);
      const { data } = res.data;
      setTime(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getPrice = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/statistics/price/${content[selectedMarker].restaurantId}`
      );
      console.log("price", res);
      const { data } = res.data;
      setPrice(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getPeople = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/statistics/people/${content[selectedMarker].restaurantId}`
      );
      console.log("people", res);
      const { data } = res.data;
      setPeople(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getReview = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/review/combine/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/${content[selectedMarker].restaurantId}`
      );
      console.log("review", res);
      const { kakaoReviews, normalReviews } = res.data;
      setReview([...kakaoReviews, ...normalReviews]);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    if (!selectedMarker) return;
    getDetailContent();
    getMenu();
    getSeason();
    getTime();
    getPrice();
    getPeople();
    getReview();
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
          {detailContent && (
            <div className="absolute bottom-0 left-0 w-full z-20">
              <DraggableCardDetail
                item={detailContent}
                menu={menu}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                isFull={isFull}
                setIsFull={setIsFull}
                season={season}
                time={time}
                price={price}
                people={people}
                review={review}
                showReview={showReview}
                setShowReview={setShowReview}
              />
            </div>
          )}

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

      {isFull && showMenu && (
        <div className="absolute top-0 left-0 w-full z-30">
          <MenuList menu={menu} setShowMenu={setShowMenu} />
        </div>
      )}

      {isFull && showReview && (
        <div className="absolute top-0 left-0 w-full z-30">
          <ReviewList review={review} setShowReview={setShowReview} />
        </div>
      )}
    </div>
  );
}
