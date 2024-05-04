import useWishList from "@hooks/useWishList";
import Image from "next/image";

export default function RecommCard({ item }) {
  const { wish, handleWish } = useWishList(item);

  return (
    <div className="w-[143px] shrink-0 flex flex-col gap-[6px]">
      <div className="relative">
        <Image
          alt="별점"
          src={item.photoUrl}
          width={143}
          height={102}
          className="h-[102px] rounded-[6px] object-cover"
          priority
        />
        <Image
          alt="찜"
          src={
            wish
              ? require("@images/star-recomm-orange.svg")
              : require("@images/star-outline-white.svg")
          }
          width={20}
          height={20}
          className="absolute top-[6px] right-[6px] cursor-pointer"
          onClick={handleWish}
        />
      </div>
      <span className="font-sb text-[#3B3F4A] line-clamp-2">
        {item.placeName}
      </span>
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
