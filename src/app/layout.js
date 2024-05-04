import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "공슐랭가이드",
  description:
    "서울시 공무원 업무 추진비 데이터를 바탕으로 신뢰도 높은 음식점을 소개합니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
