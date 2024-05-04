import axiosInstance from "@api/axiosInstance";
import useUserInfo from "@hooks/useUserInfo";
import Image from "next/image";

export default function ReviewItem({ item, openModal }) {
  const { userInfo } = useUserInfo();

  const deleteReview = async () => {
    try {
      const res = await axiosInstance.delete(
        `/api/api/review/normal/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/reviews/${item.id}`
      );
      console.log("delete review", res);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-[8px] text-[1.4rem]">
      <span className="font-m text-[#9DA0A8]">
        {item.relativeTimeDescription}
      </span>
      <span className="font-b text-[#3B3F4A]">{item.authorName}</span>
      <div className="flex justify-between">
        <div className="flex gap-[6px] items-center mb-[2px]">
          <div className="flex gap-[4px] items-center">
            {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
              <Image
                key={`${i}-review`}
                alt=""
                src={require("@images/star_review-orange.svg")}
                width={22}
                height={21}
              />
            ))}
            {Array.from({ length: 5 - Math.round(item.rating) }).map((_, i) => (
              <Image
                key={`${5 - i}-review`}
                alt=""
                src={require("@images/star_review-gray.svg")}
                width={22}
                height={21}
              />
            ))}
          </div>
          <span className="text-[#FF823C] font-b">{item.rating}</span>
        </div>
        {item.userId &&
          item.userId ===
            (userInfo.userId ?? +localStorage.getItem("userId")) && (
            <Image
              alt="삭제하기"
              src={require("@images/trash-gray.svg")}
              width={24}
              height={24}
              className="mb-[6px] cursor-pointer"
              onClick={() =>
                openModal(
                  "리뷰를 삭제하시겠습니까?",
                  () => () => deleteReview()
                )
              }
            />
          )}
      </div>
      {item.photoUrl && (
        <Image
          alt=""
          src={item.photoUrl}
          width={343}
          height={155}
          priority
          className="h-[155px] mb-[8px] rounded-[8px] object-cover"
        />
      )}
      <p className="text-[#3B3F4A]">{item.text}</p>
    </div>
  );
}
