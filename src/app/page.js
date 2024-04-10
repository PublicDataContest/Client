import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-[20px] h-[100vh]">
      <div className="flex flex-col items-center pt-[200px]">
        <span className="font-[Pretendard-Medium] text-[1.4rem] text-[#333333]">
          공무원 맛집 찾기
        </span>
        <span className="font-[Pretendard-Bold] text-[4.2rem]">HELLO!</span>
      </div>
      <Link className="w-full" href="/home">
        <button className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#FF823C] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[15px]">
          시작하기
        </button>
      </Link>
    </main>
  );
}
