import Image from "next/image";
import { useState } from "react";
import ReviewCalendar from "./reviewCalendar";

export default function ReviewWrite({ setWriteReview }) {
  const [selectedStar, setSelectedStar] = useState(
    Array.from({ length: 5 }, () => false)
  );
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const handleSelectStar = (starIdx) => {
    const newArr = JSON.parse(JSON.stringify(selectedStar));
    newArr[starIdx] = !newArr[starIdx];
    setSelectedStar(newArr);
  };

  return (
    <div
      className={`relative h-[100vh] ${
        showDate ? "overflow-hidden" : "overflow-y-auto"
      } px-[16px] pb-[18px] bg-[#EFF1F4]`}
    >
      <div className="py-[10px]">
        <Image
          alt="뒤로가기"
          src={require("@images/chevron_left-gray.svg")}
          width={24}
          height={24}
          onClick={() => setWriteReview(false)}
          className="cursor-pointer"
        />
      </div>

      <div className="pt-[8px] flex flex-col gap-[12px]">
        <span className="text-[1.8rem] font-[Pretendard-SemiBold] pb-[4px]">
          냉면맛집
        </span>

        <div className="bg-white h-[44px] rounded-[10px] px-[16px] flex justify-between items-center text-[1.4rem] font-[Pretendard-Medium]">
          <span className="text-[#3B3F4A]">방문 날짜</span>
          <button
            className="flex gap-[4px] items-center"
            onClick={() => setShowDate(true)}
          >
            <Image
              alt="방문 날짜"
              src={require("@images/calendar-gray.svg")}
              width={20}
              height={20}
            />
            <span className="text-[#9DA0A8]">
              {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}
            </span>
          </button>
        </div>

        <div className="bg-white h-[100px] rounded-[10px] px-[16px] flex flex-col gap-[8px] justify-center items-center text-[1.4rem] font-[Pretendard-Medium]">
          <span className="text-[#3B3F4A]">방문한 가게는 어떠셨나요?</span>
          <div className="flex gap-[7px] items-center">
            {selectedStar.map((v, i) => (
              <Image
                key={i}
                alt="별점"
                src={
                  v
                    ? require("@images/star_review-fill-orange.svg")
                    : require("@images/star_review-outline-gray.svg")
                }
                width={34}
                height={34}
                priority
                onClick={() => handleSelectStar(i)}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <textarea
            className="bg-white h-[223px] rounded-[10px] py-[12px] px-[14px] placeholder:text-[#9DA0A8]"
            placeholder={`방문한 가게에 대한 리뷰를 남겨 주세요.${"\n"}(최소 10자)`}
          ></textarea>
          <span className="self-end text-[#5A5E6A] text-[1.2rem]">
            0 <span className="text-[#9DA0A8]">/500</span>
          </span>
        </div>

        <div className="mt-[4px] bg-white h-[157px] rounded-[10px] p-[16px] font-[Pretendard-Medium] flex flex-col justify-center items-center gap-[6px]">
          <span className="text-[#3B3F4A] text-[1.4rem]">
            이미지를 첨부해 주세요(선택)
          </span>
          <div className="w-[144px] h-[80px] rounded-[8px] bg-[#EFF1F4]"></div>
          <span className="self-end text-[#9DA0A8] text-[1.3rem]">
            0 / <span className="text-[#5A5E6A]">1</span>
          </span>
        </div>
      </div>

      <button className="w-full mt-[29px] h-[43px] bg-[#9DA0A8] rounded-[10px]">
        <span className="text-white font-[Pretendard-SemiBold]">등록하기</span>
      </button>

      {showDate && (
        <div className="absolute top-0 left-0 z-30 w-full">
          <ReviewCalendar
            date={date}
            setDate={setDate}
            setShowDate={setShowDate}
          />
        </div>
      )}
    </div>
  );
}
