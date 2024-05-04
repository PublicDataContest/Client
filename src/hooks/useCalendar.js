import { getDaysInMonth, subMonths } from "date-fns";
import { useState } from "react";

const DAYS_IN_WEEK = 7;
const DAY_LABEL = ["S", "M", "T", "W", "T", "F", "S"];
const DEFAULT_TRASH_VALUE = 0;
const CALENDER_LENGTH = 35;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);

  const prevDays = Array.from({
    length: Math.max(0, currentDate.getDay()),
  }).map(() => ({ day: DEFAULT_TRASH_VALUE, date: null }));
  const currentDays = Array.from({ length: totalMonthDays }).map((_, i) => ({
    day: i + 1,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
  }));
  const nextDays = Array.from({
    length: CALENDER_LENGTH - currentDays.length - prevDays.length,
  }).map(() => ({ day: DEFAULT_TRASH_VALUE, date: null }));

  const allDays = [...prevDays, ...currentDays, ...nextDays];
  const weeks = [];
  for (let i = 0; i < allDays.length; i += DAYS_IN_WEEK) {
    weeks.push(allDays.slice(i, i + DAYS_IN_WEEK));
  }

  const setPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const setNextMonth = () => {
    setCurrentDate(subMonths(currentDate, -1));
  };

  return {
    weeks,
    currentDate,
    setPreviousMonth,
    setNextMonth,
    DAY_LABEL,
  };
};

export default useCalendar;
