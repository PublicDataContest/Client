import Header from "@components/header";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checkIdDuplicate = () => {
    console.log(userName);
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        userName,
        password,
      });
      console.log(res);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <form className="h-[100vh] overflow-y-auto pb-[38px]" onSubmit={signup}>
      <Header label={"회원가입"} />
      <div className="px-[16px]">
        <div className="flex flex-col gap-[33px] pt-[13px] pb-[66px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-b text-[1.5rem]">아이디</span>
            <div className="flex justify-between gap-[4px] items-center">
              <input
                type="text"
                className="w-[257px] py-[14px] px-[10px] rounded-[5px] bg-[#EFF1F4] text-[1.4rem] placeholder:text-[#9DA0A8]"
                placeholder="아이디를 입력해 주세요"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button
                type="button"
                className="w-[83px] py-[13px] text-[1.4rem] text-brand rounded-[5px] border border-brand disabled:text-[#9DA0A8] disabled:border-[#BEC1C7]"
                onClick={checkIdDuplicate}
                disabled={!userName.trim()}
              >
                중복확인
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span className="font-b text-[1.5rem]">비밀번호</span>
            <div className="flex justify-between gap-[10px] items-center py-[14px] px-[10px] rounded-[5px] bg-[#EFF1F4] text-[1.4rem]">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full placeholder:text-[#9DA0A8] bg-[#EFF1F4]"
                placeholder="비밀번호를 입력해 주세요"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                alt=""
                src={
                  showPassword
                    ? require("@images/eye.svg")
                    : require("@images/eye-hide.svg")
                }
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          <div className="flex justify-between gap-[10px] items-center py-[14px] px-[10px] rounded-[5px] bg-[#EFF1F4] text-[1.4rem]">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full placeholder:text-[#9DA0A8] bg-[#EFF1F4]"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              onChange={(e) => setCheckPassword(e.target.value)}
            />
            <Image
              alt=""
              src={
                showPassword
                  ? require("@images/eye.svg")
                  : require("@images/eye-hide.svg")
              }
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[38px] left-1/2 -translate-x-1/2">
        <button
          className="w-[343px] h-[48px] rounded-[5px] shadow-gray-sm bg-brand disabled:bg-[#9DA0A8] font-m text-white"
          disabled={
            !userName.trim() || !password.trim() || !checkPassword.trim()
          }
        >
          다음
        </button>
      </div>
    </form>
  );
}
