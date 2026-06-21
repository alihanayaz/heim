import { useCalendar } from "./use-calendar";
import { Button } from "@/components";
import { format, isSameMonth, isToday } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon, RotateCcwIcon } from "lucide-react";

export default function Calendar() {
  const { calendar, handleCalendar } = useCalendar();

  return (
    <div className="mx-auto w-full max-w-xl select-none">
      <hr className="my-12 w-12" />

      <div className="mb-8 flex items-center justify-between px-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl font-bold tracking-tight">
            {format(calendar.currentDate, "MMMM yyyy")}
          </h3>
          <p className="text-foreground-subtle text-xs tracking-widest uppercase">
            Calendar
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isSameMonth(calendar.currentDate, calendar.initialDate) && (
            <Button
              onClick={handleCalendar.reset}
              variant="ghost"
              size="icon"
              radius="full"
            >
              <RotateCcwIcon className="size-5" />
            </Button>
          )}
          <div className="bg-border/20 flex rounded-full p-1">
            <Button
              onClick={handleCalendar.prevMonth}
              variant="ghost"
              size="icon"
              radius="full"
            >
              <ChevronLeftIcon className="size-6" />
            </Button>
            <Button
              onClick={handleCalendar.nextMonth}
              variant="ghost"
              size="icon"
              radius="full"
            >
              <ChevronRightIcon className="size-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-border/20 mb-4 grid grid-cols-7 place-items-center border-b pb-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            className="text-foreground-subtle text-xs font-semibold tracking-widest uppercase"
            key={d}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {calendar.days.map((day) => {
          const currentMonth = isSameMonth(day, calendar.currentDate);
          const today = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className="flex items-center justify-center"
            >
              <Button
                variant={today ? "active" : "ghost"}
                className="size-12 text-lg"
                disabled={!currentMonth}
              >
                {day.getDate()}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
