import axiosInstance from "@api/axiosInstance";
import BottomTabNav from "@components/bottomTabNav";
import { DraggableCardDetail } from "@components/draggableCardDetail";
import RecommCard from "@components/recommCard";
import RecommList from "@components/recommList";
import useUserInfo from "@hooks/useUserInfo";
import { useEffect, useState } from "react";

export default function Recommendation() {
  const { userInfo } = useUserInfo();
  const [rankList, setRankList] = useState([]);
  const [recommList, setRecommList] = useState([]);
  const [selectedRId, setSelectedRId] = useState(null);

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
    <div className="relative overflow-y-auto pb-[60px]">
      <div className="flex flex-col gap-[8px] bg-[#EFF1F4] pt-[22px] pb-[36px] px-[16px]">
        <div className="h-[22px] flex justify-between">
          <span className="font-b">Top5 맛집</span>
          <span className="text-[#5A5E6A] font-m text-[1.2rem] self-end">
            매주 화 업데이트
          </span>
        </div>
        {rankList.map((v, i) => (
          <button
            className="w-full"
            key={v.restaurantId}
            onClick={() => setSelectedRId(v.restaurantId)}
          >
            <RecommList item={v} i={i} />
          </button>
        ))}
      </div>

      <div className="py-[16px] pl-[16px] flex flex-col gap-[8px]">
        <span className="font-b">나를 위한 맞춤 맛집</span>
        <div className="flex gap-[10px] overflow-x-auto scrollbar-hide pr-[16px]">
          {recommList.map((v, i) => (
            <button
              className="w-full"
              key={`${v.restaurantId}-${i}`}
              onClick={() => setSelectedRId(v.restaurantId)}
            >
              <RecommCard item={v} />
            </button>
          ))}
        </div>
      </div>

      {selectedRId !== null && (
        <div className="absolute bottom-0 left-0 w-full z-20">
          <DraggableCardDetail
            restaurantId={selectedRId}
            setSelectedRId={setSelectedRId}
            isSelected
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
