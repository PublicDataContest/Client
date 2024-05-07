"use client";
import Link from "next/link";
import Image from "next/image";
import useUserInfo from "@hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { userInfo } = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (userInfo.userId !== null || localStorage.getItem("userId") !== null) {
      router.push("/home");
    }
  }, []);

  return (
    <main className="bg-brand flex flex-col justify-around p-[42px]">
      <div className="flex flex-col gap-[12px]">
        <Image
          alt=""
          src={require("@images/symbol.svg")}
          width={70}
          height={70}
          priority
          className="shadow-gray"
        />
        <p className="font-b text-[2.2rem] text-[#F9FAFC]">
          공슐랭가이드를
          <br />
          즐겨보세요!
        </p>
      </div>
      <div className="flex flex-col gap-[8px] items-center">
        <div className="w-full flex flex-col gap-[18px] items-center">
          <Link className="w-full" href="/login">
            <button className="bg-white shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
              <span className="text-[#3B3F4A]">로그인</span>
            </button>
          </Link>
          <Link className="w-full" href="/signup">
            <button className="bg-[#464343] shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
              <span className="text-white">회원가입</span>
            </button>
          </Link>
        </div>
        <Link href="/privacy" target="blank">
          <span className="font-b text-[1.3rem] text-[#3B3F4A]">
            개인정보처리방침
          </span>
        </Link>
      </div>
    </main>
  );
}
