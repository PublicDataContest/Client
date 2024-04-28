import Header from "@components/header";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {};

  return (
    <div>
      <Header label={"로그인"} />
      <form className="px-[16px]" onSubmit={login}>
        <div className="flex flex-col gap-[33px] pt-[13px] pb-[66px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-b text-[1.5rem]">아이디</span>
            <input
              type="text"
              className="py-[14px] px-[10px] rounded-[5px] bg-[#EFF1F4] text-[1.4rem] placeholder:text-[#9DA0A8]"
              placeholder="아이디를 입력해 주세요"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="font-b text-[1.5rem]">비밀번호</span>
            <input
              type="password"
              className="py-[14px] px-[10px] rounded-[5px] bg-[#EFF1F4] text-[1.4rem] placeholder:text-[#9DA0A8]"
              placeholder="비밀번호를 입력해 주세요"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="h-[48px] w-full rounded-[5px] shadow-gray-sm bg-brand disabled:bg-[#9DA0A8] font-m text-white"
          disabled={!userName.trim() || !password.trim()}
        >
          로그인 하기
        </button>
      </form>
    </div>
  );
}
