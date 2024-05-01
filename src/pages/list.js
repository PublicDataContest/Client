import axiosInstance from "@api/axiosInstance";
import BottomTabNav from "@components/bottomTabNav";
import ListCard from "@components/listCard";
import useUserInfo from "@hooks/useUserInfo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function List() {
  const { userInfo } = useUserInfo();
  const [list, setList] = useState([]);

  const [sortOpen, setSortOpen] = useState(false);
  const SORT_MENU = [
    { idx: 0, label: "매출수", path: "execAmounts" },
    { idx: 1, label: "평점 순", path: "ratings" },
    { idx: 2, label: "방문횟수", path: "total-visit" },
  ];
  const [selectedSort, setSelectedSort] = useState(0);
  const sortIdx = useRef(0);

  const [filterOpen, setFilterOpen] = useState(false);
  const FILTER_MENU_PRICE = [
    { idx: 0, label: "만원 이하", data: "10000" },
    { idx: 1, label: "15,000원", data: "15000" },
    { idx: 2, label: "20,000원", data: "20000" },
    { idx: 3, label: "20,000원 이상", data: "25000" },
  ];
  const FILTER_MENU_SEASON = [
    { idx: 0, label: "봄", data: "spring" },
    { idx: 1, label: "여름", data: "summer" },
    { idx: 2, label: "가을", data: "fall" },
    { idx: 3, label: "겨울", data: "winter" },
  ];
  const FILTER_MENU_TIME = [
    { idx: 0, label: "아침", data: "morning" },
    { idx: 1, label: "점심", data: "lunch" },
    { idx: 2, label: "저녁", data: "dinner" },
  ];
  const FILTER_MENU_PEOPLE = [
    { idx: 0, label: "5명 이하", data: "spring" },
    { idx: 1, label: "10명 이하", data: "spring" },
    { idx: 2, label: "20명 이하", data: "spring" },
    { idx: 3, label: "20명 이상", data: "spring" },
  ];
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [selectedFilterPrice, setSelectedFilterPrice] = useState(null);
  const [selectedFilterSeason, setSelectedFilterSeason] = useState([]);
  const [selectedFilterTime, setSelectedFilterTime] = useState([]);
  const [selectedFilterPeople, setSelectedFilterPeople] = useState(null);
  const filterPriceIdx = useRef(null);
  const filterSeasonIdx = useRef([]);
  const filterTimeIdx = useRef([]);
  const filterPeopleIdx = useRef(null);
  const selectedSection = useRef(null);
  const isSortData = useRef(true);

  useEffect(() => {
    const modalSort = document.querySelector("#modalSort");
    modalSort.addEventListener("click", (e) => {
      if (e.target === modalSort) {
        setSortOpen(false);
      }
    });

    const modalFilter = document.querySelector("#modalFilter");
    modalFilter.addEventListener("click", (e) => {
      if (e.target === modalFilter) {
        setFilterOpen(false);
      }
    });
  }, []);

  const initSelected = (sIdx) => {
    // 다른 섹션은 선택 불가
    setSelectedFilterPrice(sIdx === 0 ? selectedFilterPrice : null);
    setSelectedFilterSeason(sIdx === 1 ? selectedFilterSeason : []);
    setSelectedFilterTime(sIdx === 2 ? selectedFilterTime : []);
    setSelectedFilterPeople(sIdx === 3 ? selectedFilterPeople : null);
  };

  const handleSelectOne = (state, setState, idx, sIdx) => {
    initSelected(sIdx);
    if (state === idx) {
      setState(null);
      selectedSection.current = null;
    } else {
      setState(idx);
      selectedSection.current = sIdx;
    }
  };

  const handleSelectMany = (state, setState, idx, sIdx) => {
    initSelected(sIdx);
    if (state.includes(idx)) {
      const newState = state.filter((v) => v !== idx);
      setState(newState);

      if (!newState.length) {
        selectedSection.current = null;
      }
    } else {
      setState((prev) => [...prev, idx]);
      selectedSection.current = sIdx;
    }
  };

  const getSortData = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/${SORT_MENU[selectedSort].path}/${
          userInfo.userId ?? localStorage.getItem("userId")
        }`
      );
      console.log("sort", SORT_MENU[selectedSort].path, res);
      const { content } = res.data.data;
      setList(content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getPriceData = async () => {
    try {
      const priceItem = FILTER_MENU_PRICE[selectedFilterPrice];
      const res = await axiosInstance.get(
        `/api/api/${priceItem.data}/${
          userInfo.userId ?? localStorage.getItem("userId")
        }`
      );
      console.log("price", priceItem.label, res);
      const { content } = res.data.data;
      setList(content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const getSeasonData = async () => {
    console.log("selectedFilterSeason", selectedFilterSeason);
    // 새로운 배열을 생성하여 각 프로미스의 완료를 기다릴 수 있도록 함
    const seasonPromises = [];
    selectedFilterSeason.forEach(async (idx) => {
      try {
        const seasonItem = FILTER_MENU_SEASON[idx];
        const promise = axiosInstance
          .get(
            `/api/api/${
              userInfo.userId ?? localStorage.getItem("userId")
            }?season=${seasonItem.data}`
          )
          .then((res) => {
            console.log("season", seasonItem.label, res);
            return res.data.data.content;
          })
          .catch((error) => {
            console.log(error.response.data.message);
            return [];
          });
        seasonPromises.push(promise);
      } catch (e) {
        console.error("Error fetching season data:", e);
      }
    });

    try {
      // 모든 프로미스가 완료되길 기다림
      const seasonList = await Promise.all(seasonPromises);
      const flattenedSeasonList = seasonList.flat();
      const uniqueSeasonList = flattenedSeasonList.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.restaurantId === item.restaurantId)
      );
      console.log("seasonList", uniqueSeasonList);
      setList(uniqueSeasonList);
    } catch (error) {
      console.error("Error fetching season data:", error);
    }
  };

  const getTimeData = async () => {
    console.log("selectedFilterTime", selectedFilterTime);
    // 새로운 배열을 생성하여 각 프로미스의 완료를 기다릴 수 있도록 함
    const timePromises = [];
    selectedFilterTime.forEach(async (idx) => {
      try {
        const timeItem = FILTER_MENU_TIME[idx];
        const promise = axiosInstance
          .get(
            `/api/api/time/${
              userInfo.userId ?? localStorage.getItem("userId")
            }?time=${timeItem.data}`
          )
          .then((res) => {
            console.log("time", timeItem.label, res);
            return res.data.data.content;
          })
          .catch((error) => {
            console.log(error.response.data.message);
            return [];
          });
        timePromises.push(promise);
      } catch (e) {
        console.error("Error fetching time data:", e);
      }
    });

    try {
      // 모든 프로미스가 완료되길 기다림
      const timeList = await Promise.all(timePromises);
      const flattenedTimeList = timeList.flat();
      const uniqueTimeList = flattenedTimeList.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.restaurantId === item.restaurantId)
      );
      console.log("timeList", uniqueTimeList);
      setList(uniqueTimeList);
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  useEffect(() => {
    getSortData();
  }, []);

  useEffect(() => {
    if (filterOpen) return;
    let isOn;
    if (selectedSection.current === 0) {
      isOn =
        selectedFilterPrice !== null &&
        selectedFilterPrice !== filterPriceIdx.current;
    } else if (selectedSection.current === 1) {
      isOn =
        selectedFilterSeason.length &&
        JSON.stringify(selectedFilterSeason) !==
          JSON.stringify(filterSeasonIdx.current);
    } else if (selectedSection.current === 2) {
      isOn =
        selectedFilterTime.length &&
        JSON.stringify(selectedFilterTime) !==
          JSON.stringify(filterTimeIdx.current);
    } else if (selectedSection.current === 3) {
      isOn =
        selectedFilterPeople !== null &&
        selectedFilterPeople !== filterPeopleIdx.current;
    }
    setIsFilterApply(isOn);

    if (isOn) {
      if (selectedSection.current === 0) {
        getPriceData();
        filterPriceIdx.current = selectedFilterPrice;
      } else if (selectedSection.current === 1) {
        getSeasonData();
        filterSeasonIdx.current = selectedFilterSeason;
      } else if (selectedSection.current === 2) {
        getTimeData();
        filterTimeIdx.current = selectedFilterTime;
      } else if (selectedSection.current === 3) {
        filterPeopleIdx.current = selectedFilterPeople;
      }
      isSortData.current = false;
    } else if (selectedSection.current === null && !isSortData.current) {
      getSortData();
    }
  }, [filterOpen]);

  useEffect(() => {
    if (sortOpen) return;
    const isOn = selectedSort !== sortIdx.current;
    if (isOn) {
      getSortData();
      sortIdx.current = selectedSort;
      isSortData.current = true;
    }
  }, [sortOpen]);

  return (
    <div className="flex flex-col gap-[14px] pt-[28px] pb-[80px] px-[16px] bg-[#EFF1F4] h-[100vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <button
          type="button"
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="w-[103px] h-[34px] p-[8px] flex gap-[10px] justify-between items-center bg-white rounded-[5px]"
          onClick={() => setSortOpen((prev) => !prev)}
        >
          <span className="text-[1.4rem] font-[Pretendard-Meidum]">
            {SORT_MENU[selectedSort].label}
          </span>
          <Image
            alt="toggle"
            src={require("@images/arrow_down-gray.svg")}
            width={16}
            height={16}
            priority
            className={`transition-all transform ${sortOpen && "-rotate-180"}`}
          />
        </button>
        <Image
          className="cursor-pointer"
          alt="filter"
          src={
            isFilterApply
              ? require("@images/filter-orange.svg")
              : require("@images/filter-gray.svg")
          }
          width={24}
          height={24}
          priority
          onClick={() => setFilterOpen((prev) => !prev)}
        />
      </div>

      <div className="flex flex-col gap-[12px]">
        {list.map((v) => (
          <ListCard key={v.restaurantId} item={v} />
        ))}
      </div>

      <div
        id="modalSort"
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          sortOpen || "hidden"
        }`}
      >
        <div id="dropdown" className="absolute bottom-0 left-0 w-full">
          <div className="flex flex-col gap-[16px] pt-[6px] pb-[14px] h-[272px] rounded-t-[20px] bg-white shadow-t-gray">
            <div className="self-center w-[53px] h-[4px] bg-[#D5D8DC] rounded-[2px]" />
            <ul
              aria-labelledby="dropdownDefaultButton"
              className="text-[1.4rem] font-[Pretendard-Medium] text-[#5A5E6A]"
            >
              <li className="py-[7.5px] px-[22px] text-[1.3rem] font-[Pretendard-Medium] text-[#9E9E9E]">
                정렬
              </li>
              {SORT_MENU.map((v) => (
                <li key={v.idx}>
                  <button
                    className={`py-[12px] px-[22px] w-full text-start ${
                      selectedSort === v.idx &&
                      "text-[#FF823C] font-[Pretendard-Bold]"
                    }`}
                    type="button"
                    onClick={() => setSelectedSort(v.idx)}
                  >
                    {v.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        id="modalFilter"
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          filterOpen || "hidden"
        }`}
      >
        <div id="dropdown" className="absolute bottom-0 left-0 w-full">
          <div className="flex flex-col gap-[16px] pt-[6px] pb-[14px] h-[432px] rounded-t-[20px] bg-white shadow-t-gray">
            <div className="self-center w-[53px] h-[4px] bg-[#D5D8DC] rounded-[2px]" />
            <ul
              aria-labelledby="dropdownDefaultButton"
              className="flex flex-col gap-[24px] text-[1.4rem] px-[16px]"
            >
              <li className="flex flex-col gap-[8px] text-[1.4rem]">
                <span className="font-[Pretendard-Bold]">가격별</span>
                <div className="flex gap-x-[8px] gap-y-[10px] flex-wrap">
                  {FILTER_MENU_PRICE.map((v) => (
                    <button
                      key={v.idx}
                      className={`shrink-0 min-w-[57px] h-[30px] px-[16px] rounded-full ${
                        selectedFilterPrice === v.idx
                          ? "text-white font-[Pretendard-Medium] bg-[#FF823C]"
                          : "bg-[#E4E6EA] text-[#9DA0A8]"
                      }`}
                      type="button"
                      onClick={() =>
                        handleSelectOne(
                          selectedFilterPrice,
                          setSelectedFilterPrice,
                          v.idx,
                          0
                        )
                      }
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </li>

              <li className="flex flex-col gap-[8px] text-[1.4rem]">
                <span className="font-[Pretendard-Bold]">계절별</span>
                <div className="flex gap-x-[8px] gap-y-[10px] flex-wrap">
                  {FILTER_MENU_SEASON.map((v) => (
                    <button
                      key={v.idx}
                      className={`shrink-0 min-w-[57px] h-[30px] px-[16px] rounded-full ${
                        selectedFilterSeason.includes(v.idx)
                          ? "text-white font-[Pretendard-Medium] bg-[#FF823C]"
                          : "bg-[#E4E6EA] text-[#9DA0A8]"
                      }`}
                      type="button"
                      onClick={() =>
                        handleSelectMany(
                          selectedFilterSeason,
                          setSelectedFilterSeason,
                          v.idx,
                          1
                        )
                      }
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </li>

              <li className="flex flex-col gap-[8px] text-[1.4rem]">
                <span className="font-[Pretendard-Bold]">시간대별</span>
                <div className="flex gap-x-[8px] gap-y-[10px] flex-wrap">
                  {FILTER_MENU_TIME.map((v) => (
                    <button
                      key={v.idx}
                      className={`shrink-0 min-w-[57px] h-[30px] px-[16px] rounded-full ${
                        selectedFilterTime.includes(v.idx)
                          ? "text-white font-[Pretendard-Medium] bg-[#FF823C]"
                          : "bg-[#E4E6EA] text-[#9DA0A8]"
                      }`}
                      type="button"
                      onClick={() =>
                        handleSelectMany(
                          selectedFilterTime,
                          setSelectedFilterTime,
                          v.idx,
                          2
                        )
                      }
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </li>

              <li className="flex flex-col gap-[8px] text-[1.4rem]">
                <span className="font-[Pretendard-Bold]">인원별</span>
                <div className="flex gap-x-[8px] gap-y-[10px] flex-wrap">
                  {FILTER_MENU_PEOPLE.map((v) => (
                    <button
                      key={v.idx}
                      className={`shrink-0 min-w-[57px] h-[30px] px-[16px] rounded-full ${
                        selectedFilterPeople === v.idx
                          ? "text-white font-[Pretendard-Medium] bg-[#FF823C]"
                          : "bg-[#E4E6EA] text-[#9DA0A8]"
                      }`}
                      type="button"
                      onClick={() =>
                        handleSelectOne(
                          selectedFilterPeople,
                          setSelectedFilterPeople,
                          v.idx,
                          3
                        )
                      }
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
