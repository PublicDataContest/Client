export default function MenuItem({ item, idx, menu }) {
  return (
    <div
      className={`${
        idx < menu.length - 1 && "border-b border-b-[#EFF1F4]"
      } py-[12px] flex flex-col gap-[2px] text-[#3B3F4A] text-[1.4rem]`}
    >
      <span>{item.menu}</span>
      <span className="font-b">{item.price}</span>
    </div>
  );
}
