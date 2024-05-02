import axiosInstance from "@api/axiosInstance";
import BottomTabNav from "@components/bottomTabNav";
import ListCard from "@components/listCard";
import useUserInfo from "@hooks/useUserInfo";
import { useEffect, useState } from "react";

export default function My() {
  const { userInfo } = useUserInfo();
  const [wishList, setWishList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);
  const TAB_MENU = [
    { idx: 0, label: "찜한 가게" },
    { idx: 1, label: "리뷰 쓴 가게" },
  ];

  const getWishList = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/wish-restaurant`
      );
      console.log("wish-restaurant", res);
      setWishList(res.data.data.content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getReviewList = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/${userInfo.userId ?? localStorage.getItem("userId")}/reviews`
      );
      console.log("reviews", res);
      setReviewList(res.data.data.content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    getWishList();
    getReviewList();
  }, []);

  return (
    <div className="relative h-[100vh] overflow-y-auto bg-[#EFF1F4]">
      <div className="flex pt-[24px] px-[16px]">
        {TAB_MENU.map((v) => (
          <button
            key={v.idx}
            className={`w-full h-[37px] flex justify-center items-center ${
              tabIdx === v.idx
                ? "border-b-2 border-b-brand"
                : "border-b border-b-[#D5D8DC]"
            }`}
            onClick={() => setTabIdx(v.idx)}
          >
            <span
              className={`text-[1.4rem] ${
                tabIdx === v.idx ? "text-brand" : "text-[#9DA0A8]"
              }`}
            >
              {v.label}
            </span>
          </button>
        ))}
      </div>

      <div className="pt-[22px] px-[16px] flex flex-col gap-[12px]">
        <span className="font-b">2024.02.21</span>
        {tabIdx === 0
          ? wishList.map((v, i) => <ListCard key={i} item={v} />)
          : reviewList.map((v, i) => <ListCard key={i} item={v} />)}
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
