import { useCalendar } from "./useCalendar";
import { Button } from "@/components";
import { isSameMonth, isToday } from "date-fns";
import {
  CalendarSyncIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

export default function Calendar() {
  const { calendar, handleCalendar } = useCalendar();

  return (
    <div className="border-border mx-auto mt-24 w-full max-w-2xl rounded-md border p-4 text-center">
      <div className="mb-8 flex items-center justify-between gap-2">
        <Button onClick={handleCalendar.prevMonth} variant="ghost" size="icon">
          <ChevronLeftIcon className="size-5" />
        </Button>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold md:text-xl">
            {calendar.currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          {!isSameMonth(calendar.currentDate, calendar.initialDate) && (
            <Button onClick={handleCalendar.reset} variant="ghost" size="icon">
              <CalendarSyncIcon className="size-5" />
            </Button>
          )}
        </div>
        <Button onClick={handleCalendar.nextMonth} variant="ghost" size="icon">
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 place-items-center gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div className="font-medium" key={d}>
            {d}
          </div>
        ))}
        {calendar.days.map((day) => (
          <Button
            key={day.toISOString()}
            variant={isToday(day) ? "destructive" : "ghost"}
            size="icon"
            disabled={!isSameMonth(day, calendar.currentDate)}
            className="rounded-full"
          >
            {day.getDate()}
          </Button>
        ))}
      </div>
    </div>
  );
}
