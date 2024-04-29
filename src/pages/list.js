import axiosInstance from "@api/axiosInstance";
import BottomTabNav from "@components/bottomTabNav";
import ListCard from "@components/listCard";
import useUserInfo from "@hooks/useUserInfo";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function List() {
  const { userInfo } = useUserInfo();
  const [sortOpen, setSortOpen] = useState(false);
  const SORT_MENU = [
    { idx: 0, label: "매출수", path: "execAmounts" },
    { idx: 1, label: "평점 순", path: "ratings" },
    { idx: 3, label: "방문횟수", path: "total-visit" },
  ];
  const [selectedSort, setSelectedSort] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const FILTER_MENU = [
    {
      idx: 0,
      label: "가격별",
      option: ["만원 이하", "15000원", "20000원", "20000이상"],
    },
    { idx: 1, label: "계절별", option: ["봄", "여름", "가을", "겨울"] },
    { idx: 2, label: "시간대별", option: ["아침", "점심", "저녁"] },
    {
      idx: 3,
      label: "인원별",
      option: ["5명이하", "10명이하", "20명이하", "20명이상"],
    },
  ];
  const [selectedFilter, setSelectedFilter] = useState(
    FILTER_MENU.map(() => [])
  );
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [list, setList] = useState([]);

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

  const handleSelectFilter = (labelIdx, optionIdx) => {
    const newArr = JSON.parse(JSON.stringify(selectedFilter));
    if (newArr[labelIdx].includes(optionIdx)) {
      newArr[labelIdx] = newArr[labelIdx].filter((v) => v !== optionIdx);
      setSelectedFilter(newArr);
      return;
    }
    if (labelIdx === 0 || labelIdx === 3) {
      // 중복 필터링 불가
      newArr[labelIdx] = [optionIdx];
    } else {
      newArr[labelIdx].push(optionIdx);
    }
    setSelectedFilter(newArr);
  };

  useEffect(() => {
    if (filterOpen) return;
    const isOn = selectedFilter.some((arr) => arr.length);
    setIsFilterApply(isOn);
    if (isOn) {
      console.log(selectedFilter);
    }
  }, [filterOpen]);

  const getSortData = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/api/${SORT_MENU[selectedSort].path}/${
          userInfo.userId ?? localStorage.getItem("userId")
        }`
      );
      console.log("sortData", res);
      const { content } = res.data.data;
      setList(content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    getSortData();
  }, [selectedSort]);

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
              {FILTER_MENU.map((v) => (
                <li
                  key={v.idx}
                  className="flex flex-col gap-[8px] text-[1.4rem]"
                >
                  <span className="font-[Pretendard-Bold]">{v.label}</span>
                  <div className="flex gap-x-[8px] gap-y-[10px] flex-wrap">
                    {v.option.map((op, i) => (
                      <button
                        key={i}
                        className={`shrink-0 min-w-[57px] h-[30px] px-[16px] rounded-full ${
                          selectedFilter[v.idx].includes(i)
                            ? "text-white font-[Pretendard-Medium] bg-[#FF823C]"
                            : "bg-[#E4E6EA] text-[#9DA0A8]"
                        }`}
                        type="button"
                        onClick={() => handleSelectFilter(v.idx, i)}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
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
