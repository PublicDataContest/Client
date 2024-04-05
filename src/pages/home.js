import TagButton from "@component/components/tagButton";

export default function Home() {
  return (
    <div className="relative">
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
    </div>
  );
}
