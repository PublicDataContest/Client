import { getDaysInMonth, subMonths } from "date-fns";
import { useState } from "react";

const DAYS_IN_WEEK = 7;
const DAY_LABEL = ["S", "M", "T", "W", "T", "F", "S"];
const DEFAULT_TRASH_VALUE = 0;
const CALENDAR_LENGTH = 35;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCalendarForMonth = (date) => {
    const totalMonthDays = getDaysInMonth(date);
    const prevDays = Array.from({
      length: Math.max(0, date.getDay()),
    }).map(() => ({ day: DEFAULT_TRASH_VALUE, date: null }));
    const currentDays = Array.from({ length: totalMonthDays }).map((_, i) => ({
      day: i + 1,
      date: new Date(date.getFullYear(), date.getMonth(), i + 1),
    }));
    const nextDays = Array.from({
      length: CALENDAR_LENGTH - currentDays.length - prevDays.length,
    }).map(() => ({ day: DEFAULT_TRASH_VALUE, date: null }));

    const allDays = [...prevDays, ...currentDays, ...nextDays];
    const weeks = [];
    for (let i = 0; i < allDays.length; i += DAYS_IN_WEEK) {
      weeks.push(allDays.slice(i, i + DAYS_IN_WEEK));
    }
    return weeks;
  };

  const getCalendarForYear = (year) => {
    const calendars = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const calendar = getCalendarForMonth(date);
      calendars.push({ calendar, year, month: month + 1 });
    }
    return calendars;
  };

  const setPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const setNextMonth = () => {
    setCurrentDate(subMonths(currentDate, -1));
  };

  return {
    currentMonthCalendar: getCalendarForMonth(currentDate),
    yearlyCalendars: [
      ...getCalendarForYear(currentDate.getFullYear() - 1),
      ...getCalendarForYear(currentDate.getFullYear()),
    ],
    currentDate,
    setPreviousMonth,
    setNextMonth,
    DAY_LABEL,
  };
};

export default useCalendar;
