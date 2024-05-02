import useWishList from "@hooks/useWishList";
import Image from "next/image";

export default function ListCard({ item }) {
  const { wish, handleWish } = useWishList(item);

  return (
    <div className="flex gap-[10px] w-[343px] h-[118px] bg-white rounded-[10px] p-[8px] relative">
      <Image
        alt=""
        src={
          wish
            ? require("@images/star-orange.svg")
            : require("@images/star-gray.svg")
        }
        width={20}
        height={20}
        className="absolute top-[10px] right-[10px] cursor-pointer"
        onClick={handleWish}
      />
      <Image
        alt="냉면"
        src={item?.photoUrl}
        width={105}
        height={102}
        priority
        className="rounded-[6px] object-cover"
      />
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <div className="flex gap-[4px] items-center">
            <span className="font-[Pretendard-SemiBold] text-[1.4rem] text-[#3B3F4A]">
              {item?.placeName}
            </span>
            {/* <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
              한식
            </span> */}
          </div>
          <div className="flex gap-[4px] items-center">
            <Image
              alt="별점"
              src={require("../../public/images/star-fill-orange.svg")}
              width={12}
              height={11}
            />
            <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
              {item?.rating}
            </span>
            <span className="font-[Pretendard-Medium] text-[1.3rem] text-[#7F828C]">
              ·
            </span>
            <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
              리뷰 {item?.reviewsNum}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[6px] overflow-x-auto scrollbar-hide">
          {item?.hashTags.split(" #").map((v) => (
            <div
              key={v}
              className="px-[8px] shrink-0 h-[26px] bg-[#7F828C] rounded-[5px] flex items-center justify-center"
            >
              <span className="font-m text-[1.4rem] text-white">
                #{v.replace("#", "").trim()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
