import Image from "next/image";

export default function ReviewList({ review, setShowReview }) {
  return (
    <div className="h-[100vh] overflow-y-auto px-[16px] pb-[18px] bg-white">
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
            <div key={v.id} className="flex flex-col gap-[8px] text-[1.4rem]">
              <span className="font-m text-[#9DA0A8]">
                {v.relativeTimeDescription}
              </span>
              <span className="font-b text-[#3B3F4A]">{v.authorName}</span>
              <div className="flex gap-[6px] items-center mb-[2px]">
                <div className="flex gap-[4px] items-center">
                  {Array.from({ length: Math.round(v.rating) }).map((_, i) => (
                    <Image
                      key={`${i}-review`}
                      alt=""
                      src={require("@images/star_review-orange.svg")}
                      width={22}
                      height={21}
                    />
                  ))}
                  {Array.from({ length: 5 - Math.round(v.rating) }).map(
                    (_, i) => (
                      <Image
                        key={`${5 - i}-review`}
                        alt=""
                        src={require("@images/star_review-gray.svg")}
                        width={22}
                        height={21}
                      />
                    )
                  )}
                </div>
                <span className="text-[#FF823C] font-b">{v.rating}</span>
              </div>
              {v.photoUrl && (
                <Image
                  alt=""
                  src={v.photoUrl}
                  width={343}
                  height={155}
                  priority
                  className="h-[155px] mb-[8px] rounded-[8px] object-cover"
                />
              )}
              <p className="text-[#3B3F4A]">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
