import Image from "next/image";
import ReviewItem from "@components/reviewItem";

export default function ReviewList({
  review,
  setShowReview,
  openModal,
  getReview,
}) {
  return (
    <div className="overflow-y-auto px-[16px] pb-[18px] bg-white">
      <div className="py-[10px]">
        <Image
          alt="뒤로가기"
          src={require("@images/chevron_left-gray.svg")}
          width={24}
          height={24}
          onClick={() => setShowReview(false)}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-[10px] pt-[20px] px-[16px]">
        <span className="font-[Pretendard-Bold] text-[#212121]">
          리뷰 <span className="text-brand">{review.length}</span>
        </span>
        <div className="flex flex-col gap-[24px]">
          {review.map((v) => (
            <ReviewItem
              key={v.id}
              item={v}
              openModal={openModal}
              getReview={getReview}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
