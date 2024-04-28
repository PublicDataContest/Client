import Image from "next/image";

export default function MenuList({ menu, setShowMenu }) {
  return (
    <div className="h-[100vh] overflow-y-auto px-[16px] pb-[18px] bg-white">
      <div className="py-[10px]">
        <Image
          alt="뒤로가기"
          src={require("@images/chevron_left-gray.svg")}
          width={24}
          height={24}
          onClick={() => setShowMenu(false)}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-[10px] pt-[20px] px-[16px]">
        <span className="font-[Pretendard-Bold] text-[#212121]">
          메뉴 <span className="text-brand">{menu.length}</span>
        </span>
        <div className="px-[2px]">
          {menu.map((v, i) => (
            <div
              key={i}
              className={`${
                i < menu.length - 1 && "border-b border-b-[#EFF1F4]"
              } py-[12px] flex flex-col gap-[2px] text-[#3B3F4A] text-[1.4rem]`}
            >
              <span>{v.menu}</span>
              <span className="font-b">{v.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
