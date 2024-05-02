import axiosInstance from "@api/axiosInstance";
import useUserInfo from "@hooks/useUserInfo";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Recommendation() {
  const { userInfo } = useUserInfo();
  const [rankList, setRankList] = useState([]);
  const [recommList, setRecommList] = useState([]);

  const getTopRanking = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/top-ranking`
      );
      console.log("top-ranking", res);
      setRankList(res.data.data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getRecomm = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/recommendation/${
          userInfo.userId ?? localStorage.getItem("userId")
        }?longText=${"중구"}`
      );
      console.log("recommendation", res);
      setRecommList(res.data.data.content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    getTopRanking();
    getRecomm();
  }, []);

  return (
    <div className="h-[100vh] overflow-y-auto">
      <div className="flex flex-col gap-[8px] bg-[#EFF1F4] pt-[22px] pb-[36px] px-[16px]">
        <div className="h-[22px] flex justify-between">
          <span className="font-b">Top5 맛집</span>
          <span className="text-[#5A5E6A] font-m text-[1.2rem] self-end">
            매주 화 업데이트
          </span>
        </div>
        {rankList.map((v, i) => (
          <div
            key={v.restaurantId}
            className="h-[48px] rounded-[5px] bg-white p-[16px] flex justify-between items-center"
          >
            <div className="flex gap-[13px]">
              <span
                className={`font-m ${i < 3 ? "text-brand" : "text-[#464343]"}`}
              >
                {i + 1}
              </span>
              <span className="text-[1.4rem] font-m">{v.placeName}</span>
            </div>
            <div className="flex gap-[4px] items-center">
              <Image
                alt="별점"
                src={require("@images/star-fill-orange.svg")}
                width={12}
                height={11}
              />
              <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
                {v.rating}
              </span>
              <span className="font-[Pretendard-Medium] text-[1.3rem] text-[#7F828C]">
                ·
              </span>
              <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
                리뷰 {v.reviewsNum}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-[16px]">
        <span className="font-b mb-[8px]">나를 위한 맞춤 맛집</span>
        <div className="flex gap-[10px] overflow-x-auto scrollbar-hide">
          {recommList.map((v, i) => (
            <div
              key={`${v.restaurantId}-${i}`}
              className="w-[143px] shrink-0 flex flex-col gap-[6px]"
            >
              <div className="relative">
                <Image
                  alt="별점"
                  src={v.photoUrl}
                  width={143}
                  height={102}
                  className="h-[102px] rounded-[6px] object-cover"
                  priority
                />
                <Image
                  alt="별점"
                  src={require("@images/star-outline-white.svg")}
                  width={20}
                  height={20}
                  className="absolute top-[6px] right-[6px] cursor-pointer"
                />
              </div>
              <span className="font-sb text-[#3B3F4A]">{v.placeName}</span>
              <div className="flex gap-[4px] items-center">
                <Image
                  alt="별점"
                  src={require("@images/star-fill-orange.svg")}
                  width={12}
                  height={11}
                />
                <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
                  {v.rating}
                </span>
                <span className="font-[Pretendard-Medium] text-[1.3rem] text-[#7F828C]">
                  ·
                </span>
                <span className="font-[Pretendard-Medium] text-[1.2rem] text-[#7F828C]">
                  리뷰 {v.reviewsNum}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
