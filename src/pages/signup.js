import Header from "@components/header";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Toast from "@components/toast";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isNotDuplicated, setIsNotDuplicated] = useState(false);
  const router = useRouter();
  const [toast, setToast] = useState("");

  const checkIdDuplicate = async () => {
    try {
      const res = await axios.get(`/api/check/username?username=${userName}`);
      const { status, message } = res.data;
      setToast(message);
      // alert(message);
      if (status === 200) {
        setIsNotDuplicated(true);
      }
    } catch (e) {
      setToast(e.response.data.message);
      // alert(e.response.data.message);
    }
  };

  const isValidPassword = () => {
    return password === checkPassword;
  };

  const signup = async (e) => {
    e.preventDefault();

    if (!isValidPassword()) {
      setToast("비밀번호가 일치하지 않습니다.");
      // alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.post("/api/register", {
        userName,
        password,
      });
      const { status, message } = res.data;
      if (status === 200) {
        // alert(message);
        router.push("/login");
      }
    } catch (e) {
      setToast(e.response.data.message);
      // alert(e.response.data.message);
    }
  };

  return (
    <form className="overflow-y-auto pb-[38px]" onSubmit={signup}>
      <Header label={"회원가입"} />
      <div className="px-[16px]">
        <div className="flex flex-col gap-[33px] pt-[13px] pb-[66px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-b text-[1.5rem]">아이디</span>
            <div className="flex justify-between gap-[4px] items-center">
              <input
                type="text"
                className="w-full py-[14px] px-[10px] rounded-[5px] bg-[#EFF1F4] text-[1.4rem] placeholder:text-[#9DA0A8]"
                placeholder="아이디를 입력해 주세요"
                onChange={(e) => {
                  setUserName(e.target.value);
                  setIsNotDuplicated(false);
                }}
              />
              <button
                type="button"
                className="shrink-0 w-[83px] py-[13px] text-[1.4rem] text-brand rounded-[5px] border border-brand disabled:text-[#9DA0A8] disabled:border-[#BEC1C7]"
                onClick={checkIdDuplicate}
                disabled={!userName.trim() || isNotDuplicated}
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
            !userName.trim() ||
            !isNotDuplicated ||
            !password.trim() ||
            !checkPassword.trim()
          }
        >
          다음
        </button>
      </div>

      {toast && (
        <div className="absolute top-0 left-0 w-full p-[16px]">
          <Toast setToast={setToast} text={toast} />
        </div>
      )}
    </form>
  );
}
