import { useEffect, useState } from "react";

export const useVh = () => {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const setScreenSize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      setVh(vh);
    };

    setScreenSize();
    window.addEventListener("resize", () => setScreenSize());
    return () => window.removeEventListener("resize", setScreenSize);
  }, []);

  return vh;
};
