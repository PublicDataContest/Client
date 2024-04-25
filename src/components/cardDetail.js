import Image from "next/image";

export function CardDetail({ item }) {
  return (
    <div className="overflow-y-auto relative">
      <Image
        alt="대표"
        src={item.imgUrl}
        width={375}
        height={174}
        className="w-full h-[174px] object-cover"
        priority
      />

      <div className="p-[16px] pb-[20px] flex flex-col gap-[10px] font-[Pretendard-Medium] text-[1.4rem] relative before:content-starRoundGrayIcon before:absolute before:top-[16px] before:right-[16px]">
        <div className="flex items-center gap-[4px]">
          <span className="max-w-[286px] line-clamp-2 font-[Pretendard-SemiBold] text-[1.8rem] text-[#212121]">
            {item.title}
          </span>
          <span className="text-[#6A6A6A]">{item.category}</span>
        </div>
        <span className="text-[#7F828C]">{item.address}</span>
        <div className="flex gap-[4px] items-center">
          <span
            className={`${item.isOpen ? "text-[#FF823C]" : "text-[#7F828C]"}`}
          >
            {item.isOpen ? "영업중" : "영업 전"}
          </span>
          <span className="text-[#8C8C8C]">·</span>
          <span className="text-[#3B3F4A]">{item.openTime}</span>
        </div>
        <div className="h-[44px] rounded-[8px] bg-[#EFF1F4] flex items-center py-[11px] px-[12px]">
          <div className="flex gap-[8px]">
            <span className="text-[#FF823C]">{item.starCnt}</span>
            <div className="bg-[#D5D8DC] w-[1px] h-[18px]" />
            <span className="text-[#3B3F4A]">후기 {item.reviewCnt}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[6px] bg-[#EFF1F4]" />

      <div className="py-[20px] px-[16px] flex flex-col gap-[34px] bg-white">
        <div className="flex flex-col gap-[10px]">
          <span className="font-[Pretendard-Bold] text-[#212121]">
            계절별 방문자 비율
          </span>
          <div className="h-[170px] rounded-[8px] bg-[#EFF1F4]"></div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="font-[Pretendard-Bold] text-[#212121]">
            시간대별 방문자수
          </span>
          <div className="h-[170px] rounded-[8px] bg-[#EFF1F4]"></div>
        </div>
      </div>
    </div>
  );
}
