import BottomTabNav from "@component/components/bottomTabNav";
import ListCard from "@component/components/listCard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function List() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const OPTION_MENU = [
    { idx: 0, label: "매출수" },
    { idx: 1, label: "좋아요수" },
    { idx: 2, label: "최근방문수" },
    { idx: 3, label: "방문횟수" },
  ];
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    const modal = document.querySelector("#modal");
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        setDropdownOpen(false);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-[14px] pt-[10px] pb-[80px] px-[16px] bg-[#EFF1F4] h-[100vh] overflow-y-auto">
      <div className="relative before:content-searchIcon before:absolute before:top-[10px] before:left-[12px]">
        <input
          className="w-[343px] h-[44px] pl-[38px] pr-[12px] text-[1.4rem] text-[#3B3F4A] bg-white rounded-[10px]"
          placeholder="찾고싶은 가게가 있으면 검색해보세요!"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="w-[103px] h-[34px] p-[8px] flex gap-[10px] justify-between items-center bg-white rounded-[5px]"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span className="text-[1.4rem] font-[Pretendard-Meidum]">
            {OPTION_MENU[selectedOption].label}
          </span>
          <Image
            alt="toggle"
            src={require("../../public/images/arrow_down-gray.svg")}
            width={16}
            height={16}
            priority
            className={`transition-all transform ${
              dropdownOpen && "-rotate-180"
            }`}
          />
        </button>
        <Image
          className="cursor-pointer"
          alt="filter"
          src={require("../../public/images/filter-gray.svg")}
          width={24}
          height={24}
          priority
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
      </div>

      <div className="flex flex-col gap-[12px]">
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
      </div>

      <div
        id="modal"
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          dropdownOpen || "hidden"
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
              {OPTION_MENU.map((v) => (
                <li key={v.idx}>
                  <button
                    className={`py-[12px] px-[22px] w-full text-start ${
                      selectedOption === v.idx &&
                      "text-[#FF823C] font-[Pretendard-Bold]"
                    }`}
                    type="button"
                    onClick={() => setSelectedOption(v.idx)}
                  >
                    {v.label}
                  </button>
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
