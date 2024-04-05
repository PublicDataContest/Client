import Card from "@component/components/card";
import TagButton from "@component/components/tagButton";

export default function Home() {
  return (
    <div className="relative h-[100vh]">
      <div className="absolute top-0 left-0 w-[375px] pt-[44px]">
        <div className="pl-[16px] relative before:content-locationIcon before:absolute before:top-[10px] before:left-[28px]">
          <input className="w-[343px] h-[44px] pl-[38px] pr-[12px] px-[12px] text-[1.4rem] text-[#3B3F4A] bg-white rounded-[10px] shadow-gray" />
        </div>
        <div className="pl-[16px] py-[10px] flex gap-[8px] overflow-x-auto scrollbar-hide">
          <TagButton label="거리순" active={true} />
          <TagButton label="착한가게" active={false} />
          <TagButton label="친환경" active={false} />
          <TagButton label="친환경" active={false} />
          <TagButton label="친환경" active={false} />
          <TagButton label="친환경" active={false} />
          <TagButton label="친환경" active={false} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex flex-col pt-[6px] pb-[14px] h-[200px] rounded-t-[20px] bg-white shadow-t-gray">
          <div className="self-center w-[53px] h-[4px] bg-[#D5D8DC] rounded-[2px]" />
          <span className="pt-[22px] pb-[6px] px-[16px] font-[Pretendard-Bold]">
            내주변 공무원이 자주가는 맛집
          </span>
          <div className="pl-[16px] flex gap-[10px] overflow-x-auto scrollbar-hide">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
