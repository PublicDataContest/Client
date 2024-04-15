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
      },
      content: {
        locationIcon: 'url("/images/location-orange.svg")',
        starGrayIcon: 'url("/images/star-gray.svg")',
        starRoundGrayIcon: 'url("/images/star-round-gray.svg")',
        searchIcon: 'url("/images/search-gray.svg")',
        barGrayIcon: 'url("/images/bar-gray.svg")',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
