import Image from "next/image";
import { useRouter } from "next/router";

export default function Header({ label }) {
  const router = useRouter();

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
        className="cursor-pointer justify-self-end"
        onClick={() => router.back()}
      />
    </div>
  );
}
