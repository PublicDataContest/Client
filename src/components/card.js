import Image from "next/image";

export default function Card() {
  return (
    <div className="shrink-0 pt-[12px] pb-[8px] px-[12px] w-[232px] h-[124px] rounded-[10px] bg-[#EFF1F4] flex flex-col justify-between relative before:content-starGrayIcon before:absolute before:top-[8px] before:right-[8px]">
      <div className="flex flex-col">
        <div className="flex gap-[4px] items-center">
          <span className="max-w-[180px] line-clamp-2 font-[Pretendard-SemiBold] text-[1.4rem] text-[#3B3F4A]">
            냉면맛집
          </span>
          <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
            한식
          </span>
        </div>
        <div className="flex gap-[4px] items-center">
          <span className="font-[Pretendard-Medium] text-[1.3rem] text-[#3B3F4A]">
            80m
          </span>
          <span className="font-[Pretendard-Medium] text-[1.3rem] text-[#7F828C]">
            ·
          </span>
          <Image
            alt="별점"
            src={require("../../public/images/star-fill-orange.svg")}
            width={12}
            height={11}
          />
          <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
            4.25
          </span>
          <span className="font-[Pretendard-Medium] text-[1.3rem] text-[#7F828C]">
            ·
          </span>
          <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
            리뷰 12
          </span>
        </div>
      </div>
      <div className="h-[39px] bg-[#D5D8DC] rounded-[5px] flex items-center py-[11px] px-[10px]">
        <span className="font-[Pretendard-SemiBold] text-[1.2rem] text-[#5A5E6A]">
          후기가 없습니다. 작성해보세요!
        </span>
      </div>
    </div>
  );
}
