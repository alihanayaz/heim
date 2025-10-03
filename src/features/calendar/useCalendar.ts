import { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

const INITIAL_DATE = new Date();

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(INITIAL_DATE);

  const nextMonth = () => setCurrentDate((date) => addMonths(date, 1));
  const prevMonth = () => setCurrentDate((date) => subMonths(date, 1));
  const reset = () => setCurrentDate(INITIAL_DATE);

  const getMonthDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  };

  return {
    calendar: {
      initialDate: INITIAL_DATE,
      currentDate,
      days: getMonthDays(),
    },
    handleCalendar: {
      nextMonth,
      prevMonth,
      reset,
    },
  };
}
