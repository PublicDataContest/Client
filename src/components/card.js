import useWishList from "@hooks/useWishList";
import Image from "next/image";

export default function Card({ item }) {
  const { wish, handleWish } = useWishList(item);

  return (
    <div className="shrink-0 pt-[12px] pb-[8px] px-[12px] w-[232px] h-[124px] rounded-[10px] bg-[#EFF1F4] flex flex-col justify-between relative">
      <Image
        alt=""
        src={
          wish
            ? require("@images/star-orange.svg")
            : require("@images/star-gray.svg")
        }
        width={20}
        height={20}
        className="absolute top-[8px] right-[8px] cursor-pointer"
        onClick={handleWish}
      />
      <div className="flex flex-col">
        <div className="flex gap-[4px] items-center">
          <span className="max-w-[180px] line-clamp-2 font-[Pretendard-SemiBold] text-[1.4rem] text-[#3B3F4A]">
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
          {/* <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
            {item.categoryName}
          </span> */}
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
      <div className="flex gap-[6px] items-center overflow-x-auto scrollbar-hide">
        {item.hashTags.split(" #").map((v) => (
          <div
            key={v}
            className="px-[8px] shrink-0 h-[26px] bg-[#464343] rounded-[5px] flex items-center justify-center"
          >
            <span className="font-m text-[1.4rem] text-white">
              #{v.replace("#", "").trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
