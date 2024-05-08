import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useVh } from "@hooks/useVh";
import MenuList from "@components/menuList";
import ReviewList from "@components/reviewList";
import dynamic from "next/dynamic";
import useWishList from "@hooks/useWishList";
import ReviewItem from "@components/reviewItem";
import MenuItem from "@components/menuItem";
import axiosInstance from "@api/axiosInstance";
import useUserInfo from "@hooks/useUserInfo";
import { useRouter } from "next/router";
import { useModal } from "@hooks/useModal";
import LayerPopup from "@components/layerPopup";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LEVEL_HEIGHTS = [65, 100];

export function DraggableCardDetail({
  restaurantId,
  setSelectedRId,
  isSelected,
}) {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const [showMenu, setShowMenu] = useState(false);
  const [isFull, setIsFull] = useState(!!isSelected);
  const [showReview, setShowReview] = useState(false);
  const [item, setItem] = useState(null);
  const [menu, setMenu] = useState([]);
  const [review, setReview] = useState([]);
  const modalRef = useRef(null);
  const { isModalOpen, modalText, callbackFn, openModal, closeModal } =
    useModal(modalRef);

  const MAX_MENU_DISPLAY_CNT = 5;
  const MAX_REVIEW_DISPLAY_CNT = 3;

  const { wish, handleWish } = useWishList(item);

  // 계절별
  const optionsSeason = {
    colors: ["#FF823C", "#FFA36F", "#FFD4BB", "#FFE4D5"],
    labels: ["봄", "여름", "가을", "겨울"],
  };
  const [seriesSeason, setSeriesSeason] = useState([]);

  // 시간대별
  const [seriesTimeArr, setSeriesTimeArr] = useState([]);
  // const seriesTimeArr = [45, 12, 3, 60, 58, 34, 41, 12, 3, 64, 42, 34, 22, 54];
  const seriesTime = [
    {
      name: "방문자수",
      data: seriesTimeArr,
    },
  ];
  const categories = Array.from({ length: 14 }).map((_, i) => [
    `${8 + i} - ${8 + i + 1}`,
  ]);
  const optionsTime = {
    colors: [
      function ({ value, seriesIndex, w }) {
        if (value / Math.max(...seriesTimeArr) > 0.8) {
          return "#FF823C";
        } else {
          return "#BEC1C7";
        }
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "end",
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: ["#5A5E6A"],
          fontSize: "12px",
        },
      },
    },
  };

  // 가격별
  const optionsPrice = {
    colors: ["#FF823C", "#FFA36F", "#FFD4BB", "#FFE4D5"],
    labels: ["10,000원 이하", "15,000원", "20,000원", "20,000원 이상"],
  };
  const [seriesPrice, setSeriesPrice] = useState([]);

  // 인원별
  const optionsPeople = {
    colors: ["#FF823C", "#FFA36F", "#FFD4BB", "#FFE4D5"],
    labels: ["5명 이하", "10명 이하", "20명 이하", "20명 이상"],
  };
  const [seriesPeople, setSeriesPeople] = useState([]);

  const getDetailContent = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/card/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/${restaurantId}`
      );
      console.log("detailContent", res);
      const { data } = res.data;
      setItem(data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getMenu = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/menu/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/${restaurantId}`
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
        `/api/api/statistics/season/${restaurantId}`
      );
      console.log("season", res);
      const { data } = res.data;
      // setSeason(data);
      setSeriesSeason(Object.values(data));
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getTime = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/statistics/time/${restaurantId}`
      );
      console.log("time", res);
      const { data } = res.data;
      // setTime(data);
      setSeriesTimeArr(Object.values(data));
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getPrice = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/statistics/price/${restaurantId}`
      );
      console.log("price", res);
      const { data } = res.data;
      // setPrice(data);
      setSeriesPrice(Object.values(data));
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getPeople = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/statistics/people/${restaurantId}`
      );
      console.log("people", res);
      const { data } = res.data;
      // setPeople(data);
      setSeriesPeople(Object.values(data));
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getReview = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/review/combine/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/${restaurantId}`
      );
      console.log("review", res);
      const { kakaoReviews, normalReviews } = res.data;
      setReview([...kakaoReviews, ...normalReviews]);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    if (!restaurantId) return;
    getDetailContent();
    getMenu();
    getSeason();
    getTime();
    getPrice();
    getPeople();
    getReview();
  }, [restaurantId]);

  // draggable
  const [level, setLevel] = useState(isSelected ? LEVEL_HEIGHTS.length - 1 : 0);
  const startY = useRef(0);
  const deltaY = useRef(0);
  const [stickyHeader, setStickyHeader] = useState(false);
  const vh = useVh();

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
        "rounded-t-[20px] overflow-hidden before:content-barGrayIcon before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:z-20"
      } bg-white shadow-t-gray transition-[height] duration-75`}
      style={{ height: `calc(var(--vh, 1vh) * ${LEVEL_HEIGHTS[level]})` }}
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
              onClick={() =>
                isSelected ? setSelectedRId(null) : setLevel((prev) => prev - 1)
              }
              className="cursor-pointer"
            />
          </div>
        ) : (
          <Image
            alt="닫기"
            src={require("@images/close-white.svg")}
            width={24}
            height={24}
            className="absolute top-[8px] right-[16px] z-20 cursor-pointer"
            onClick={() =>
              isSelected ? setSelectedRId(null) : setLevel((prev) => prev - 1)
            }
          />
        ))}
      <div className="overflow-y-auto relative">
        <Image
          alt="대표"
          src={item?.photoUrl}
          width={375}
          height={174}
          className="w-full h-[174px] object-cover"
          priority
        />

        <div className="p-[16px] pb-[20px] flex flex-col gap-[10px] font-[Pretendard-Medium] text-[1.4rem] relative">
          <Image
            alt=""
            src={
              wish
                ? require("@images/star-round-orange.svg")
                : require("@images/star-round-gray.svg")
            }
            width={32}
            height={32}
            className="absolute top-[16px] right-[16px] cursor-pointer"
            onClick={handleWish}
          />
          <div className="flex items-center gap-[4px]">
            <span className="max-w-[286px] line-clamp-2 font-[Pretendard-SemiBold] text-[1.8rem] text-[#212121]">
              {item?.placeName}
            </span>
            {item?.priceModel && (
              <Image
                alt="착한가게"
                src={require("@images/mark-orange.svg")}
                width={17}
                height={17}
              />
            )}
            {/* <span className="text-[#6A6A6A]">
              {item?.categoryName?.replace(/"/g, "")}
            </span> */}
          </div>
          <span className="text-[#7F828C]">{item?.addressName}</span>
          <span className="text-[#3B3F4A] whitespace-pre-wrap">
            {item?.currentOpeningHours}
          </span>
          <div className="h-[44px] rounded-[8px] bg-[#EFF1F4] flex items-center py-[11px] px-[12px]">
            <div className="flex gap-[8px]">
              <div className="flex gap-[4px] items-center">
                {Array.from({ length: Math.round(item?.rating) }).map(
                  (_, i) => (
                    <Image
                      key={i}
                      alt=""
                      src={require("@images/star_review-orange.svg")}
                      width={22}
                      height={21}
                    />
                  )
                )}
                {Array.from({ length: 5 - Math.round(item?.rating) }).map(
                  (_, i) => (
                    <Image
                      key={5 - i}
                      alt=""
                      src={require("@images/star_review-gray.svg")}
                      width={22}
                      height={21}
                    />
                  )
                )}
              </div>
              <span className="text-[#FF823C]">{item?.rating}</span>
              <div className="bg-[#D5D8DC] w-[1px] h-[18px]" />
              <span className="text-[#3B3F4A]">리뷰 {item?.reviewsNum}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[6px] bg-[#EFF1F4]" />

        <div className="flex flex-col gap-[10px] pt-[20px] px-[16px]">
          <span className="font-[Pretendard-Bold] text-[#212121]">
            메뉴 <span className="text-brand">{menu.length}</span>
          </span>
          <div className="px-[2px]">
            {!isFull && showMenu
              ? menu.map((v, i) => (
                  <MenuItem key={i} item={v} idx={i} menu={menu} />
                ))
              : menu
                  .slice(0, MAX_MENU_DISPLAY_CNT)
                  .map((v, i) => (
                    <MenuItem key={i} item={v} idx={i} menu={menu} />
                  ))}
          </div>
        </div>
        {menu.length > MAX_MENU_DISPLAY_CNT && !showMenu && (
          <button
            className="w-full flex flex-col items-center pt-[6px] h-[48px] border-t border-t-[#EFF1F4]"
            onClick={() => setShowMenu(true)}
          >
            <span className="text-[1.4rem] font-sb text-[#5A5E6A]">
              메뉴 더보기
            </span>
            <Image
              alt=""
              src={require("@images/chevron_bottom-gray.svg")}
              width={24}
              height={24}
            />
          </button>
        )}

        <div className="w-full h-[6px] bg-[#EFF1F4]" />

        <div className="py-[20px] flex flex-col gap-[34px] bg-white">
          <div className="flex flex-col gap-[10px] px-[16px]">
            <span className="font-[Pretendard-Bold] text-[#212121]">
              계절별 방문자 비율
            </span>
            <div className="h-[170px] rounded-[8px] bg-[#EFF1F4] py-[10px] px-[43px]">
              <Chart
                type="donut"
                options={optionsSeason}
                series={seriesSeason}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] px-[16px]">
            <span className="font-[Pretendard-Bold] text-[#212121]">
              시간대별 방문자수
            </span>
            <div className="h-[190px] rounded-[8px] bg-[#EFF1F4] px-[13px]">
              <Chart type="bar" options={optionsTime} series={seriesTime} />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] px-[16px]">
            <span className="font-[Pretendard-Bold] text-[#212121]">
              가격별 통계 그래프
            </span>
            <div className="h-[170px] rounded-[8px] bg-[#EFF1F4] py-[10px] px-[15px]">
              <Chart type="donut" options={optionsPrice} series={seriesPrice} />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] px-[16px]">
            <span className="font-[Pretendard-Bold] text-[#212121]">
              인원별 통계 그래프
            </span>
            <div className="h-[170px] rounded-[8px] bg-[#EFF1F4] py-[10px] px-[27px]">
              <Chart
                type="donut"
                options={optionsPeople}
                series={seriesPeople}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[6px] bg-[#EFF1F4]" />

        <div className="flex flex-col py-[20px] px-[16px]">
          <span className="mb-[20px] font-[Pretendard-Bold] text-[#212121]">
            리뷰 <span className="text-brand">{review.length}</span>
          </span>
          <div className="flex flex-col gap-[24px]">
            {!isFull && showReview
              ? review.map((v) => (
                  <ReviewItem
                    key={v.id}
                    item={v}
                    openModal={openModal}
                    getReview={getReview}
                  />
                ))
              : review
                  .slice(0, MAX_REVIEW_DISPLAY_CNT)
                  .map((v) => (
                    <ReviewItem
                      key={v.id}
                      item={v}
                      openModal={openModal}
                      getReview={getReview}
                    />
                  ))}
          </div>
        </div>
        {review.length > MAX_REVIEW_DISPLAY_CNT && !showReview && (
          <button
            className="w-full flex flex-col items-center pt-[6px] h-[48px] border-t border-t-[#EFF1F4]"
            onClick={() => setShowReview(true)}
          >
            <span className="text-[1.4rem] font-sb text-[#5A5E6A]">
              리뷰 더보기
            </span>
            <Image
              alt=""
              src={require("@images/chevron_bottom-gray.svg")}
              width={24}
              height={24}
            />
          </button>
        )}

        <div className="w-full h-[6px] bg-[#EFF1F4]" />
      </div>

      {isFull && showReview && (
        <div className="absolute top-0 left-0 w-full z-30">
          <ReviewList
            review={review}
            setShowReview={setShowReview}
            openModal={openModal}
            getReview={getReview}
          />
        </div>
      )}

      {isFull && showMenu && (
        <div className="absolute top-0 left-0 w-full h-full z-30">
          <MenuList menu={menu} setShowMenu={setShowMenu} />
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="bg-white pt-[8px] pb-[18px] px-[16px]">
          <button
            className="w-full bg-[#FF823C] h-[43px] rounded-[10px] flex gap-[8px] items-center justify-center"
            onClick={() =>
              router.push({
                pathname: "/reviewWrite",
                query: { restaurantId, placeName: item.placeName },
              })
            }
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
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full z-30 bg-black/30 h-full flex justify-center items-center"
          ref={modalRef}
          onClick={(e) => {
            if (e.target === modalRef.current) closeModal();
          }}
        >
          <LayerPopup
            text={modalText}
            btnTextL={"취소"}
            btnTextR={"삭제"}
            callbackFnL={closeModal}
            callbackFnR={() => {
              callbackFn();
              closeModal();
            }}
          />
        </div>
      )}
    </div>
  );
}
