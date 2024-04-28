import Image from "next/image";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function CardDetail({
  item,
  menu,
  isFull,
  showMenu,
  setShowMenu,
  season,
  time,
  price,
}) {
  const starCnt = Math.round(item?.rating);
  const MAX_MENU_DISPLAY_CNT = 5;

  // 계절별
  const optionsSeason = {
    colors: ["#FF823C", "#FFA36F", "#FFD4BB", "#FFE4D5"],
    labels: ["봄", "여름", "가을", "겨울"],
  };
  const seriesSeason = Object.values(season);

  // 시간대별
  const seriesTimeArr = Object.values(time);
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
  const seriesPrice = Object.values(price);

  return (
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
            item?.wishListRestaurant
              ? require("@images/star-fill-orange.svg")
              : require("@images/star-round-gray.svg")
          }
          width={32}
          height={32}
          className="absolute top-[16px] right-[16px]"
        />
        <div className="flex items-center gap-[4px]">
          <span className="max-w-[286px] line-clamp-2 font-[Pretendard-SemiBold] text-[1.8rem] text-[#212121]">
            {item?.placeName}
          </span>
          <span className="text-[#6A6A6A]">
            {item?.categoryName?.replace(/"/g, "")}
          </span>
        </div>
        <span className="text-[#7F828C]">{item?.addressName}</span>
        <span className="text-[#3B3F4A] whitespace-pre-wrap">
          {item?.currentOpeningHours}
        </span>
        <div className="h-[44px] rounded-[8px] bg-[#EFF1F4] flex items-center py-[11px] px-[12px]">
          <div className="flex gap-[8px]">
            <div className="flex gap-[4px] items-center">
              {Array(starCnt).map((_, i) => (
                <Image
                  key={i}
                  alt=""
                  src={require("@images/star_review-orange.svg")}
                  width={22}
                  height={21}
                />
              ))}
              {Array(5 - starCnt).map((_, i) => (
                <Image
                  key={5 - i}
                  alt=""
                  src={require("@images/star_review-gray.svg")}
                  width={22}
                  height={21}
                />
              ))}
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
                <div
                  key={i}
                  className={`${
                    i < menu.length - 1 && "border-b border-b-[#EFF1F4]"
                  } py-[12px] flex flex-col gap-[2px] text-[#3B3F4A] text-[1.4rem]`}
                >
                  <span>{v.menu}</span>
                  <span className="font-b">{v.price}</span>
                </div>
              ))
            : menu.slice(0, MAX_MENU_DISPLAY_CNT).map((v, i) => (
                <div
                  key={i}
                  className={`${
                    i < MAX_MENU_DISPLAY_CNT - 1 &&
                    "border-b border-b-[#EFF1F4]"
                  } py-[12px] flex flex-col gap-[2px] text-[#3B3F4A] text-[1.4rem]`}
                >
                  <span>{v.menu}</span>
                  <span className="font-b">{v.price}</span>
                </div>
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
          <div className="h-[170px] rounded-[8px] bg-[#EFF1F4] py-[10px] px-[30px]">
            <Chart type="donut" options={optionsSeason} series={seriesSeason} />
          </div>
        </div>

        <div className="flex flex-col gap-[10px] px-[16px]">
          <span className="font-[Pretendard-Bold] text-[#212121]">
            시간대별 방문자수
          </span>
          <div className="h-[190px] rounded-[8px] bg-[#EFF1F4]">
            <Chart type="bar" options={optionsTime} series={seriesTime} />
          </div>
        </div>

        <div className="flex flex-col gap-[10px] px-[16px]">
          <span className="font-[Pretendard-Bold] text-[#212121]">
            가격별 통계 그래프
          </span>
          <div className="h-[170px] rounded-[8px] bg-[#EFF1F4] py-[10px] px-[10px]">
            <Chart type="donut" options={optionsPrice} series={seriesPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
