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
          간편 로그인으로 공식탐방을
          <br />
          즐겨보세요!
        </p>
      </div>
      <div className="flex flex-col gap-[12px] items-center">
        {/* <Link className="w-full" href="/home"> */}
        <button className="bg-[#FEE500] flex items-center gap-[34px] px-[46px] shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
          <Image
            alt=""
            src={require("@images/kakao.svg")}
            width={24}
            height={24}
          />
          <span className="text-[#3B3F4A]">카카오톡으로 로그인</span>
        </button>
        {/* </Link> */}

        {/* <Link className="w-full" href="/home"> */}
        <button className="bg-[#03C75A] flex items-center gap-[34px] px-[46px] shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
          <Image
            alt=""
            src={require("@images/naver.svg")}
            width={24}
            height={24}
          />
          <span className="text-white">네이버로 로그인</span>
        </button>
        {/* </Link> */}

        {/* <Link className="w-full" href="/home"> */}
        <button className="bg-[#F9FAFC] flex items-center gap-[34px] px-[46px] shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
          <Image
            alt=""
            src={require("@images/google.svg")}
            width={24}
            height={24}
          />
          <span className="text-[#555]">구글로 로그인</span>
        </button>
        {/* </Link> */}

        <div className="flex gap-[10px] items-center font-m text-[1.3rem] text-[#F9FAFC]">
          <Link href={"/login"}>
            <span>로그인</span>
          </Link>
          <div className="w-[1px] h-[11px] bg-[#F9FAFC]" />
          <Link href={"/signup"}>
            <span>회원가입</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
