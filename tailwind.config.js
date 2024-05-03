/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        gray: "0px 2px 6px 0px rgba(0, 0, 0, 0.12)",
        "t-gray": "0px -4px 8px 0px rgba(0, 0, 0, 0.12)",
        "gray-sm": "0px 2px 4px 0px rgba(0, 0, 0, 0.06)",
        modal: "0px 5px 12px 0px rgba(11, 10, 30, 0.18)",
      },
      content: {
        locationIcon: 'url("/images/location-orange.svg")',
        starGrayIcon: 'url("/images/star-gray.svg")',
        starRoundGrayIcon: 'url("/images/star-round-gray.svg")',
        searchIcon: 'url("/images/search-gray.svg")',
        barGrayIcon: 'url("/images/bar-gray.svg")',
      },
      fontFamily: {
        r: "Pretendard-Regular",
        m: "Pretendard-Medium",
        sb: "Pretendard-SemiBold",
        b: "Pretendard-Bold",
      },
      backgroundColor: {
        brand: "#FF823C",
      },
      textColor: {
        brand: "#FF823C",
      },
      borderColor: {
        brand: "#FF823C",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
