import { useEffect, useState } from "react";
import useUserInfo from "./useUserInfo";
import axiosInstance from "@api/axiosInstance";

export default function useWishList(item) {
  const { userInfo } = useUserInfo();
  const [wish, setWish] = useState(false);
  // TODO: card와 cardDetail 상태 공유. card에서 찜 누르면 cardDetail에서도 즉각 반영되도록

  useEffect(() => {
    if (!item) return;
    setWish(item.wishListRestaurant);
  }, [item]);

  const handleWish = async () => {
    try {
      const res = await axiosInstance.put(
        `/api/api/wishlist/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/restaurants/${item.restaurantId}`
      );
      console.log("wishlist", res.data);
      setWish((prev) => !prev);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return { wish, handleWish };
}
