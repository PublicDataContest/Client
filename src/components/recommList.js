import Image from "next/image";

export default function RecommList({ item, i }) {
  return (
    <div className="h-[48px] rounded-[5px] bg-white p-[16px] flex justify-between items-center">
      <div className="flex gap-[13px]">
        <span className={`font-m ${i < 3 ? "text-brand" : "text-[#464343]"}`}>
          {i + 1}
        </span>
        <div className="flex gap-[4px] items-center">
          <span className="text-[1.4rem] font-m max-w-[162px] text-nowrap text-ellipsis overflow-hidden">
            {item.placeName}
          </span>
          {item.priceModel && (
            <Image
              alt="착한가게"
              src={require("@images/mark-orange.svg")}
              width={17}
              height={17}
            />
          )}
        </div>
      </div>
      <div className="flex gap-[4px] items-center">
        <Image
          alt="별점"
          src={require("@images/star-fill-orange.svg")}
          width={12}
          height={11}
        />
        <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
          {item.rating}
        </span>
        <span className="font-[Pretendard-Medium] text-[1.3rem] text-[#7F828C]">
          ·
        </span>
        <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
          리뷰 {item.reviewsNum}
        </span>
      </div>
    </div>
  );
}
