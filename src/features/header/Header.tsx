import { useClock } from "./useClock";

function ClockDisplay() {
  const time = useClock();
  return <span>{time}</span>;
}

export default function Header() {
  const now = new Date();
  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const hours = now.getHours();
  const greeting = `Good ${hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening"}, Alihan`;
  return (
    <header className="mb-8 flex flex-wrap-reverse justify-between gap-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl">{greeting}</h2>
        <div className="text-foreground-light text-xl md:text-2xl">
          It’s {today}
        </div>
      </div>
      <ClockDisplay />
    </header>
  );
}
