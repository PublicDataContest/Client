import Image from "next/image";

export default function Header({ label }) {
  return (
    <div className=" grid grid-cols-3 py-[12px] px-[13px]">
      <div></div>
      <span className=" justify-self-center font-b text-[1.9rem]">{label}</span>
      <Image
        alt=""
        src={require("@images/close-gray.svg")}
        width={24}
        height={24}
        priority
        className=" justify-self-end"
      />
    </div>
  );
}
