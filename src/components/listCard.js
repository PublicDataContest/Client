import Image from "next/image";

export default function ListCard() {
  return (
    <div className="flex gap-[10px] w-[343px] h-[118px] bg-white rounded-[10px] p-[8px] relative before:content-starGrayIcon before:absolute before:top-[8px] before:right-[8px]">
      <Image
        alt="냉면"
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0hN_nLSpS_aVeocPQehBsoYqLEOk1P48YGkziQj6Fg&s"
        }
        width={105}
        height={102}
        priority
        className="rounded-[6px]"
      />
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <div className="flex gap-[4px] items-center">
            <span className="font-[Pretendard-SemiBold] text-[1.4rem] text-[#3B3F4A]">
              냉면맛집
            </span>
            <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
              한식
            </span>
          </div>
          <div className="flex gap-[4px] items-center">
            <Image
              alt="별점"
              src={require("../../public/images/star-fill-orange.svg")}
              width={12}
              height={11}
              priority
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
        <div className="py-[8px] px-[10px] w-full h-[32px] bg-[#EFF1F4] rounded-[5px] flex items-center">
          <span className="font-[Pretendard-SemiBold] text-[#5A5E6A] text-[1.2rem]">
            후기가 없습니다. 작성해보세요!
          </span>
        </div>
      </div>
    </div>
  );
}
